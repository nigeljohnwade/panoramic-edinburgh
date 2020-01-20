import React from 'react';

const getClassList = (identifiers) =>{
    const classList = ['card'];
    for(let item in identifiers) {
        if(identifiers.hasOwnProperty(item)){
            classList.push(`card-${identifiers[item]}`);
        }
    }
    return classList.join(' ');
};

export const Card = ({
    children,
    identifiers,
}) =>{
    return (
        <div className={getClassList(identifiers)}>
            {children}
        </div>
    )
};

export default Card;