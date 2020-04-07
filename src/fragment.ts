export const PRODUCT_FRAGMENT = `
    id    
    symbol
    engName
    korName
`;

export const BOARD_FRAGMENT = `
    fragment ProductParts on Comment
    {
        id
        product{
            ${PRODUCT_FRAGMENT}
        }
    }
`;
