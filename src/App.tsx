import React from 'react';
import {
  Navbar,
  calculateValuesIfSellerDoesNotOwnProperty,
  calculateValuesIfSellerOwnsProperty,
} from './Functions';

class App extends React.Component
<{}, {
  sellerOwnsProperty: boolean | undefined, // undefined means "not yet loaded",
  caseDoesentOwnProperty: { 
    typeOfContract: string | undefined,
    propertyShare: number | undefined,
    propertyShareAlienated: number | undefined,
  },
  isFlat: boolean,
  isNonResidentialPremisses: boolean,
  propertyLandPlot: number,
  isHouse: boolean,
  isNonResidentialBuilding: boolean | string

  propertyCadastralValue: number | undefined,
  propertyBeingSoldValue: number | undefined,
  areRelatives: boolean,
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
      isFlat: false,
      isNonResidentialPremisses: false,
      propertyLandPlot: 0,
      isHouse: false,
      isNonResidentialBuilding: false,

      propertyCadastralValue: undefined,
      propertyBeingSoldValue: undefined,
      areRelatives: false,
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
      <>
        <h3>2 - What is the type of the property?</h3>
        <div style={{maxWidth: "fit-content"}}>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={() => this.setState({ isFlat: !this.state.isFlat }) }/>
            <label className="form-check-label">
              Flat
            </label>
          </div>

          <a style={{padding: "5px"}} />
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={() => this.setState({ isNonResidentialPremisses: !this.state.isNonResidentialPremisses }) }/>
            <label className="form-check-label">
              Non-Residential Premises
            </label>
          </div>

          <label> Quantity of Land Plots</label>
          <select className="form-select" aria-label="Default select example"
          onChange={(event) => this.setState({ propertyLandPlot: Number(event.target.value) }) }>
            <option value="0" selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <a style={{padding: "5px"}} />
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
            onChange={() => this.setState({ isHouse: !this.state.isHouse }) }/>
            <label className="form-check-label">
              House
            </label>
          </div>

          <a style={{padding: "5px"}} />
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
            onChange={() => this.setState({ isNonResidentialBuilding: !this.state.isNonResidentialBuilding }) }/>
            <label className="form-check-label">
              Non-Residential Building
            </label>
          </div>
        </div>
        <br />

        <div style={{maxWidth: "fit-content"}}>
        <label> Indicate the cadastral value of the property (if a share is being alienated from the whole object, then indicate its value): </label>
            <input type="number" className="form-control" value={this.state.propertyCadastralValue} placeholder="Enter the cadastral value of the property"
            onChange={(event) => this.setState({ propertyCadastralValue: Number(event.target.value) })}></input> <br />
        
        <a style={{padding: "5px"}} />
        <label> Indicate the value of the property for which it is being sold (if a share is being alienated from the whole object, then indicate its value): </label>
            <input type="number" className="form-control" value={this.state.propertyBeingSoldValue} placeholder="Enter the cadastral value of the property which is being sold"
            onChange={(event) => this.setState({ propertyBeingSoldValue: Number(event.target.value) })}></input> <br />

        <label> Are the parties of the contract relatives? </label>
          <select className="form-select" aria-label="Default select example"
            onChange={(event) => this.setState({ areRelatives: event.target.value === 'true' ? true : false }) }>
              <option value="false" selected>NO</option>
              <option value="true">YES</option>
            </select>
        </div>
        <br />
        <button type="button" className="btn btn-primary btn-bg" onClick={() => calculateValuesIfSellerOwnsProperty(this.state)} >Calculate</button> <a style={{padding: "5px"}} />
      </>
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

  render(): JSX.Element { console.log(this.state)
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