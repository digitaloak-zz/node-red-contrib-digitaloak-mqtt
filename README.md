### MQTT input node
Based on core Node-RED "mqtt in" which uses "mqtt-broker" config node.

#### Features
- subscribe dynamically to topics  
- unsubscribe after first msg received  
- unsubscribe dynamically specific node/nodes from topic  
- pass messages through node when msg.topic not set  

#### Description
Subscribe to topics specyfing msg.topic  
Unsubscribe node from topic after first msg received, via setting checkbox in config node: "Unsubscribe from topic after first msg received"  
Unsubscribe specific node from specific topic,via setting a string value in msg.payload in format "_unsubscribe:<nodeName>" ie. "_unsubscribe:waitingForResponse"  
Pass msgs via node - don't set msg.topic  

#### Usage example
Is available here: https://flows.nodered.org/flow/5492f72a81324cd3d11b51faf

 

