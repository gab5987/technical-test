export async function calculateValuesIfSellerDoesNotOwnProperty(props: any, isBuyerMarried: boolean, isSellerMarried: boolean) {

    const calculateValue = async (value: number) => {
      let result: number = (value / 100) * 0.5 ;
      result < 300 ? result = 300 : result = result; // minimum value is 3000
      result > 20000 ? result = 20000 : result = result; // maximum value is 20000
  
      result += 6400 + 2600 + 540 + 2000;
      if(isBuyerMarried) result += 2000;
      if(isSellerMarried) result += 2000;

      alert(
        `The value of the property is: ${result.toFixed(2)} rubles\n
        Resume:
        ${isBuyerMarried ? "+ 2000 cost of consent buyer" : "no cost of consent - buyer"}
        ${isSellerMarried ? "+ 2000 cost of consent seller" : "no cost of consent - seller"}
        +2600 settlement through a notary's deposit account.
        +540 cost of certifying the extracts from the USRN.
        Notary services - free of charge.
        +2000 state duty to Rosreestr.
        `
      );
    }
  
    if(props.propertyShareAlienated === undefined) {
      calculateValue(props.propertyShare);
      return false;
    }
  
    props.propertyShareAlienated > props.propertyShare ? calculateValue(props.propertyShareAlienated) : calculateValue(props.propertyShare);
    return false;
  }

  export const calculateValuesIfSellerOwnsProperty = async (props: any) => {
      
    let totalItens: number = (
        props.propertyLandPlot + 
        Number(props.isNonResidentialBuilding) +
        Number(props.isNonResidentialPremisses) +
        Number(props.isFlat) +
        Number(props.isHouse)
    )
    const totalItensForAditionalValues: number = totalItens;

    if(totalItens > 3){
        totalItens -= 3;
        totalItens *= 1000;
    } else totalItens = 0;
    if(totalItens > 10000){ totalItens = 10000 }

    function calculateValuesIfRealatives(transactionAmount: number): number {
        if(transactionAmount > 10000000){
            return 23000 + ((transactionAmount / 100) * 0.1) + 5000 + totalItens;
        }
        else return 3000 + ((transactionAmount / 100) * 0.2) + 5000 + totalItens;
    }

    function calculateValuesIfNotRelatives(transactionAmount: number): number {
        if(transactionAmount <= 1000000) {
            return 3000 + ((transactionAmount / 100) * 0.4) + 6000 + totalItens;
        }
        else if(transactionAmount > 1000000 && transactionAmount <= 10000000) {
            return 7000 + ((transactionAmount / 100) * 0.2) + 6000 + totalItens;
        }
        else if(transactionAmount > 10000000) {
            transactionAmount = ((transactionAmount / 100) * 0.1);
            if(transactionAmount > 100000 && !props.isNonResidentialBuilding && !props.isNonResidentialPremisses) {
                transactionAmount = 100000;
            }
            return 25000 + transactionAmount + 6000 + totalItens;
        }
        return 0;
    }

    if(props.areRelatives) {
        let aditionals: number = 0;

        if(props.isBuyerMarried) aditionals += 2000;
        if(props.isSellerMarried) aditionals += 2000;
        aditionals += 2600 + 540*totalItensForAditionalValues + 2000*totalItensForAditionalValues;

        const cadastralValue = Number(calculateValuesIfRealatives(props.propertyCadastralValue).toFixed(2) + aditionals);
        const beingSoldValue = Number(calculateValuesIfRealatives(props.propertyBeingSoldValue).toFixed(2) + aditionals);

        alert(
          `The cadastral value is ${cadastralValue.toFixed(2)}, and the value of the property being sold is ${beingSoldValue.toFixed(2)}\n
          Resume:
          ${props.isBuyerMarried ? "+ 2000 cost of consent buyer" : "no cost of consent - buyer"}
          ${props.isSellerMarried ? "+ 2000 cost of consent seller" : "no cost of consent - seller"}
          +2600 settlement through a notary's deposit account.
          +${540*totalItensForAditionalValues} cost of certifying the extracts from the USRN.
          Notary services - free of charge.
          +${2000*totalItensForAditionalValues} state duty to Rosreestr.
          `
        );
    } else {
        let aditionals: number = 0;

        if(props.isBuyerMarried) aditionals += 2000;
        if(props.isSellerMarried) aditionals += 2000;
        aditionals += 2600 + 540*totalItensForAditionalValues + 2000*totalItensForAditionalValues;

        const cadastralValue = calculateValuesIfNotRelatives(props.propertyCadastralValue) + aditionals;
        const beingSoldValue = calculateValuesIfNotRelatives(props.propertyBeingSoldValue) + aditionals;

        alert(
          `The cadastral value is ${cadastralValue.toFixed(2)}, and the value of the property being sold is ${beingSoldValue.toFixed(2)}\n
          Resume:
          ${props.isBuyerMarried ? "+ 2000 cost of consent buyer" : "no cost of consent - buyer"}
          ${props.isSellerMarried ? "+ 2000 cost of consent seller" : "no cost of consent - seller"}
          +2600 settlement through a notary's deposit account.
          +${540*totalItensForAditionalValues} cost of certifying the extracts from the USRN.
          Notary services - free of charge.
          +${2000*totalItensForAditionalValues} state duty to Rosreestr.
          `
        );
    }
}
  
  export const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand">Created by Gabriel Novalski</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        See More
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="https://github.com/gab5987" target="_blank">Gabriel's github page</a></li>
                        <li><a className="dropdown-item" href="https://gabrielnovalski.tech" target="_blank">Gabriel's portfolio</a></li>
                        <li><a className="dropdown-item" href="https://github.com/gab5987/technical-test" target="_blank">Source Code</a></li>
                      </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
  }