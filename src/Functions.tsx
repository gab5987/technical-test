export async function calculateValuesIfSellerDoesNotOwnProperty(props: any) {

    const calculateValue = async (value: number) => {
      let result: number = (value / 100) * 0.5 ;
      result < 300 ? result = 300 : result = result; // minimum value is 3000
      result > 20000 ? result = 20000 : result = result; // maximum value is 20000
  
      result += 6400; // 6400 is the value of some tax maybe? I don't know
      alert(`The value of the property is: ${result}`);
    }
  
    if(props.propertyShareAlienated === undefined) {
      calculateValue(props.propertyShare);
      return false;
    }
  
    props.propertyShareAlienated > props.propertyShare ? calculateValue(props.propertyShareAlienated) : calculateValue(props.propertyShare);
    return false;
  }


//         + props.isNonResidentialPremisses ? 1 : 0
//         + props.isFlat ? 1 : 0
//         + props.isHouse ? 1 : 0

  export const calculateValuesIfSellerOwnsProperty = async (props: any) => {
      
    let totalItens: number = (
        props.propertyLandPlot + 
        Number(props.isNonResidentialBuilding) +
        Number(props.isNonResidentialPremisses) +
        Number(props.isFlat) +
        Number(props.isHouse)
    ) 
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

// - if the transaction amount is more than 10,000,000 rubles, then (25,000 rubles + 0.1% of the transaction amount exceeding 10,000,000 rubles, but if the type of property is chosen - an apartment or a residential building, then the tariff is not more than 100,000 rubles) + 6,000 rubles. (if there are more than 3 objects, then starting from the third, 1,000 rubles are added, but not more than 10,000 rubles)


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
        const cadastralValue = calculateValuesIfRealatives(props.propertyCadastralValue).toFixed(2);
        const beingSoldValue = calculateValuesIfRealatives(props.propertyBeingSoldValue).toFixed(2);

        alert(`the cadastral value is ${cadastralValue}, and the value of the property being sold is ${beingSoldValue}`)
    } else {
        const cadastralValue = calculateValuesIfRealatives(props.propertyCadastralValue).toFixed(2);
        const beingSoldValue = calculateValuesIfRealatives(props.propertyBeingSoldValue).toFixed(2);

        alert(`the cadastral value is ${cadastralValue}, and the value of the property being sold is ${beingSoldValue}`)
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