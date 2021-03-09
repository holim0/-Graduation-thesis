import { useEffect } from "react";

const Web3 = require("web3");

const faucet_code =
    "608060405234801561001057600080fd5b5060f68061001f6000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e1a7d4d146041575b005b348015604c57600080fd5b50606960048036038101908080359060200190929190505050606b565b005b67016345785d8a00008111151515608157600080fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801560c6573d6000803e3d6000fd5b50505600a165627a7a7230582020a6ee06bf1ccf9884a593fd334eb76625a72b712421d66a5747d4226ae628920029";

const gasPrice = 20000000000;

function App() {
    const test = async () => {
        const ethEnabled = () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
                return true;
            }
            return false;
        };

        if (ethEnabled()) {
            const account_address = await window.web3.eth.getAccounts();
            console.log(window.web3.utils.toWei("0.1", "ether"));
            window.web3.eth
                .sendTransaction({
                    from: account_address[0],
                    to: "0xDF017f9221214127751599F3a5d5f58d3CfcaA13",
                    data: "",
                    value: window.web3.utils.toWei("0.1", "ether"),
                })
                .then((receipt) => {
                    console.log(receipt);
                });
        } else {
            alert("오류 발생!");
        }
    };

    useEffect(() => {
        test();
    }, []);
    return <div className="App">hi</div>;
}

export default App;
