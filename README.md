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

Example is available here: https://flows.nodered.org/flow/3003f194750b0dec19502e31ca234847 (outdated)  

#### Installation (Node-RED in docker)
1. Go to Node-RED modules directory - /data/node_modules
2. Run `git clone git@github.com:digitaloak/node-red-contrib-digitaloak-mqtt.git`
3. `cd node-red-contrib-digitaloak-mqtt`
4. `npm install`
5. Restart Node-RED
 

