
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

export type Scalars = {
    ID: number;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Price = {
    __typename?: 'Price';
    barCode?: Maybe<Scalars['String']>;
    codeProduct?: Maybe<Scalars['String']>;
    federativeUnit?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    price?: Maybe<Scalars['Float']>;
    region?: Maybe<Scalars['String']>;
    regionCode?: Maybe<Scalars['String']>;
    updataAt?: Maybe<Scalars['String']>;
};

export type Product = {
    __typename?: 'Product';
    amount?: Maybe<Scalars['String']>;
    barCode?: Maybe<Scalars['String']>;
    brand?: Maybe<Scalars['String']>;
    category?: Maybe<Scalars['String']>;
    codeCategory?: Maybe<Scalars['String']>;
    codeDepartment?: Maybe<Scalars['String']>;
    codeGroup?: Maybe<Scalars['String']>;
    codeProduct?: Maybe<Scalars['String']>;
    codeProvider?: Maybe<Scalars['String']>;
    codeRow?: Maybe<Scalars['String']>;
    codeSession?: Maybe<Scalars['String']>;
    createdStockAt?: Maybe<Scalars['String']>;
    department?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    descriptionRow?: Maybe<Scalars['String']>;
    descriptionSession?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['String']>;
    length?: Maybe<Scalars['String']>;
    nameCommerce?: Maybe<Scalars['String']>;
    nameProvider?: Maybe<Scalars['String']>;
    packing?: Maybe<Scalars['String']>;
    priceFactor?: Maybe<Scalars['String']>;
    priceList?: Maybe<Array<Price>>;
    stock?: Maybe<Scalars['String']>;
    technicalInformation?: Maybe<Scalars['String']>;
    unit?: Maybe<Scalars['String']>;
    updataAt?: Maybe<Scalars['String']>;
    weight?: Maybe<Scalars['String']>;
};
  

export type Customer = {
    __typename?: 'Customer';
    addressCity?: Maybe<Scalars['String']>;
    addressDistrict?: Maybe<Scalars['String']>;
    addressNumber?: Maybe<Scalars['String']>;
    addressStreet?: Maybe<Scalars['String']>;
    availableLimit?: Maybe<Scalars['String']>;
    codeCustomer?: Maybe<Scalars['Float']>;
    contactName?: Maybe<Scalars['String']>;
    contributor?: Maybe<Scalars['String']>;
    creditLimit?: Maybe<Scalars['String']>;
    customerBlocked?: Maybe<Scalars['String']>;
    customerDocument?: Maybe<Scalars['String']>;
    dataRegister?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    federativeUnitCode?: Maybe<Scalars['String']>;
    finalCostumer?: Maybe<Scalars['String']>;
    ieRg?: Maybe<Scalars['String']>;
    lastCalculation?: Maybe<Scalars['String']>;
    lastOrderDate?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    phoneNumber?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    regionNumber?: Maybe<Scalars['String']>;
    taxCalculation?: Maybe<Scalars['String']>;
    tradingName?: Maybe<Scalars['String']>;
    useLimit?: Maybe<Scalars['String']>;
    useSimplifiedIe?: Maybe<Scalars['String']>;
};