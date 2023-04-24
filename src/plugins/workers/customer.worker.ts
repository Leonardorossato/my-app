import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    Country,
    CountryService,
    CustomerService,
    JobQueue,
    JobQueueService,
    Logger,
    RequestContext,
    TransactionalConnection,
    Customer as VendureCustomer
} from '@vendure/core';
import { Customer } from '../graphQL/graphQL';
import { ContextStrategy } from '../strategy/auth.strategy';
import { graphqlRequestClient } from '../graphQL/request.graphQL';
import { ChannelSettings } from '../channel/channel.plugin';


@Injectable()
export class CustomersServices implements OnModuleInit {

    private jobQueue: JobQueue<{
        customer: Customer
    }>;

    constructor(
        private countryService: CountryService,
        private connection: TransactionalConnection,
        private customerService: CustomerService,
        private jobQueueService: JobQueueService,
        private channelSettings: ChannelSettings,
        private contextStrategy: ContextStrategy
    ) { }

    async onModuleInit() {
        this.jobQueue = await this.jobQueueService.createQueue({
            name: 'synchronization-customers',
            process: async job => {

                const customerExists = await this.findCustomerByCode(Number(job.data.customer.codeCustomer));

                const ctx = await this.contextStrategy.createRequestContextByChannelCode(job.data.customer.regionNumber as string);

                if (!customerExists) {
                    //Check if it already exists
                    await this.checkCountryCode(ctx, "Brasil", "BR");
                    await this.registerCustomer(ctx, job.data.customer);

                    return job.result
                }

                this.updateCustomer(ctx, String(customerExists.id), job.data.customer);

                return job.result;
            },
        });

    }

    async workerCustomers() {

        Logger.info(`Customers`, `Synchronization Worker`);

        await this.channelSettings.validateChannelExist();

        const { customers } = await graphqlRequestClient.request<{ customers: Array<Customer> }>(`
            query {
                customers{
                    name
                    tradingName
                    codeCustomer
                    addressStreet
                    addressNumber
                    addressDistrict
                    addressCity
                    federativeUnitCode
                    postalCode
                    phoneNumber
                    contactName
                    customerDocument
                    email
                    ieRg
                    creditLimit
                    useLimit
                    availableLimit
                    customerBlocked
                    regionNumber
                  }
            }
        `);

        if (customers.length === 0) {
            return Logger.info(`No customers found`, `Synchronization Worker`);
        };

        customers.forEach(async (customer) => {
            this.jobQueue.add({
                customer
            }, { retries: 2 });
        })
    }

    private async checkCountryCode(
        ctx: RequestContext,
        displayCountry: string,
        countryCode: string): Promise<string | undefined> {

        try {
            //findOneByCode is a method  not working
            //const country = await this.countryService.findOneByCode(ctx, String(countryCode));
            const country =
                await this.connection
                    .rawConnection
                    .getRepository(Country)
                    .findOne({ code: countryCode });


            if (country) {
                return country.code;
            }

            Logger.info("Country not found, creating new country");


            const newCountry = await this.countryService.create(ctx, {
                enabled: true,
                code: countryCode,
                translations: [{
                    languageCode: ctx.languageCode,
                    name: displayCountry,
                }],
            });

            return newCountry.code;
        } catch (error) {
            Logger.error(error as string);
            return undefined
        }
    }

    private async findCustomerByCode(code: number): Promise<VendureCustomer | undefined> {
        return this.connection.rawConnection
            .getRepository(VendureCustomer)
            .createQueryBuilder('customer')
            .where({
                customFields: {
                    code: code
                },

            })
            .andWhere('customer.deletedAt IS NULL')
            .getOne();
    }

    private async registerCustomer(
        ctx: RequestContext,
        customer: Customer
    ): Promise<VendureCustomer | undefined> {

        if (!customer.codeCustomer) {
            Logger.error(`Customer code is required`, `Synchronization Worker`);
            return
        }



        const customerHeWasRegister = await this.customerService.create(ctx, {
            title: customer.tradingName as string,
            emailAddress: customer.email as string,
            firstName: customer.name as string,
            lastName: customer.name as string,
            phoneNumber: customer.phoneNumber as string,
            customFields: {
                "code": customer.codeCustomer,
                "customerDocument": customer.customerDocument,
                "creditlimit": customer.creditLimit,
                "uselimit": customer.useLimit,
                "availablelimit": customer.availableLimit,
                "blocked": customer.customerBlocked === "S" ? true : false,
            }
        });

        if (customerHeWasRegister instanceof VendureCustomer) {
            this.customerService.createAddress(ctx, customerHeWasRegister.id, {
                streetLine1: customer.addressStreet as string,
                city: customer.addressCity as string,
                province: customer.federativeUnitCode as string,
                postalCode: customer.postalCode as string,
                phoneNumber: customer.phoneNumber ? customer.phoneNumber as string : "",
                countryCode: 'BR',
                defaultShippingAddress: true,
                defaultBillingAddress: true,
                customFields: {
                    "number": customer.addressNumber as string,
                    "neighborhood": customer.addressDistrict as string,
                }
            });

            Logger.info(`Adding customers: ${customer.name}`, `Synchronization Worker`);

            return customerHeWasRegister;

        }

        return undefined;
    }

    private async updateCustomer(
        ctx: RequestContext,
        id: string,
        customer: Customer,
    ): Promise<VendureCustomer | undefined> {

        if (!id) {
            Logger.error(`Customer id is required`, `Synchronization Worker`);
            return
        }

        const customerHeWasRegister = await this.customerService.update(ctx, {
            id,
            title: customer.tradingName as string,
            emailAddress: customer.email as string,
            firstName: customer.name as string,
            lastName: customer.name as string,
            phoneNumber: customer.phoneNumber as string,
            customFields: {
                "code": customer.codeCustomer,
                "customerDocument": customer.customerDocument,
                "creditlimit": customer.creditLimit,
                "uselimit": customer.useLimit,
                "availablelimit": customer.availableLimit
            }
        });

        if (customerHeWasRegister instanceof VendureCustomer) {
            this.customerService.updateAddress(ctx, {
                id,
                streetLine1: customer.addressStreet as string,
                city: customer.addressCity as string,
                province: customer.federativeUnitCode as string,
                postalCode: customer.postalCode as string,
                phoneNumber: customer.phoneNumber ? customer.phoneNumber as string : "",
                countryCode: 'BR',
                defaultShippingAddress: true,
                defaultBillingAddress: true,
                customFields: {
                    "number": customer.addressNumber as string,
                    "neighborhood": customer.addressDistrict as string,
                    "blocked": customer.customerBlocked
                }
            });

        }
    }

}