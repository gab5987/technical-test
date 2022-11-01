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

  export const calculateValuesIfSellerOwnsProperty = async (props: any) => {
    alert("entrou")
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