import React from 'react';

class App extends React.Component
<{}, {
  sellerOwnsProperty: boolean | undefined, // undefined means "not yet loaded",
  caseDoesentOwnProperty: { 
    typeOfContract: string | undefined,
    propertyShare: number | undefined,
    propertyShareAlienated: number | undefined,
  },
}>
{
  constructor(props: any) {
    super(props);
    this.state = {
      sellerOwnsProperty: undefined,
      caseDoesentOwnProperty: {
        typeOfContract: undefined,
        propertyShare: undefined,
        propertyShareAlienated: undefined,
      },
    };
  }

  componentDidMount(): void {
    const url = new URLSearchParams(window.location.search);
  }

  askIfSellerOwnsProperty() {
    return(
      <div>
        <h3>1 - Does the seller(s) own the entire property?</h3>

        <button type="button" className="btn btn-primary btn-bg" onClick={() => this.setState({ sellerOwnsProperty: true })}>Yes</button> <a style={{padding: "5px"}} />
        <button type="button" className="btn btn-danger btn-bg" onClick={() => this.setState({ sellerOwnsProperty: false })}>No</button>
      </div>
    )
  }

  SellerOwnsProperty() {
    return(
      <p>uyggf</p>
    )
  }
  SellerDoesNotOwnProperty() {
    console.log(this.state)
    return(
      <>
      <div>
        <h3>2 - What is the type of the contract?</h3>

        <button type="button" className="btn btn-info btn-bg" onClick={() => this.setState({ caseDoesentOwnProperty: { typeOfContract: "purchaseAndSale", propertyShare: undefined, propertyShareAlienated: undefined, } })}>Purchase or Sale</button> <a style={{padding: "5px"}} />

        <button type="button" className="btn btn-info btn-bg" onClick={() => this.setState({ caseDoesentOwnProperty: { typeOfContract: "donation", propertyShare: undefined, propertyShareAlienated: undefined, } })}>Donation</button>
      </div>
      {
        this.state.caseDoesentOwnProperty.typeOfContract !== undefined && (
          <div className="pt-2">
            <h3>b - Indicate the cadastral value of the SHARE of the property: </h3>
            <input type="number" className="form-control" value={this.state.caseDoesentOwnProperty.propertyShare} placeholder="Enter the cadastral SHARE of the property"
            onChange={(event) => this.setState({ caseDoesentOwnProperty: { 
              typeOfContract: this.state.caseDoesentOwnProperty.typeOfContract, 
              propertyShare: Number(event.target.value), 
              propertyShareAlienated: this.state.caseDoesentOwnProperty.propertyShareAlienated, 
            } }) }></input>

            {
              this.state.caseDoesentOwnProperty.typeOfContract === "purchaseAndSale" && (
                <a className="pt-2"><br /> <input type="number" className="form-control" value={this.state.caseDoesentOwnProperty.propertyShareAlienated} placeholder="Value of the SHARE of the property which is alienated"
                onChange={(event) => this.setState({ caseDoesentOwnProperty: { 
                  typeOfContract: this.state.caseDoesentOwnProperty.typeOfContract, 
                  propertyShare: this.state.caseDoesentOwnProperty.propertyShare,
                  propertyShareAlienated: Number(event.target.value), 
                } }) }></input></a>
              )
            }
          </div>
        )
      }
      {
        this.state.caseDoesentOwnProperty.propertyShare && (
          <>
            <br />
            <button type="button" className="btn btn-outline-info btn-bg" onClick={() => calculateValuesIfSellerDoesNotOwnProperty(this.state.caseDoesentOwnProperty) } >Calculate</button>
          </>
        )
      }
      </>
    )
  }

  render(): JSX.Element {
    return (
      <>
        <Navbar />
          <div className="container">
             <div className="pt-2" />
              <div className='App'>
                <h1>Calculator of transactions for the alienation of real estate</h1>
                { 
                  this.state.sellerOwnsProperty === undefined && this.askIfSellerOwnsProperty()
                }
                {
                  this.state.sellerOwnsProperty === ( true || false ) &&
                  (this.state.sellerOwnsProperty === true && this.SellerOwnsProperty() ) || (this.state.sellerOwnsProperty === false && this.SellerDoesNotOwnProperty() )
                }
              </div>
          </div>
      </>
    );
  }
}

export default App;

async function calculateValuesIfSellerDoesNotOwnProperty(props: any) {

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

const Navbar = () => {
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