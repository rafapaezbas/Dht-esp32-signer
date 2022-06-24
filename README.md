# esp32-dht-key pair

This is an example of how to start a [hyperswarm/DHT server]() without a keyPair in memory. 
Crypto signatures are done by the [serial-signer]() using an [esp32]()
Some changes in hyperswarm/dht are necessary to make this work since the signature is now an asynchronous task.

## usage
Connect the esp32 signer to __/dev/ttyUSB0__ and run:

``` sh
node server-signer.cjs
# c1ba9580a2afa5f9db450292ba68e39767b8ed5229eb95303d1528c7343a43a5
node client c1ba9580a2afa5f9db450292ba68e39767b8ed5229eb95303d1528c7343a43a5
``` 
