### MQTT input node
Based on core Node-RED "mqtt in" which use "mqtt-broker" config node.

#### Features
- subscribe dynamically to topics
- unsubscribe after first msg received
- unsubscribe specific node/nodes from topic

#### Description
Set msg.topic to subscribe specific node to topic
Check checkbox in config node to unsubscribe node from after receiving first msg
Set string payload in format "_unsubscribe:<nodeName>" to unsubscribe given node from the topic defined in msg.topic

Example is available here: https://flows.nodered.org/flow/3003f194750b0dec19502e31ca234847 (outdated)

#### Installation (Node-RED in docker)
1. Go to Node-RED modules directory - /data/node_modules
2. Run `git clone git@github.com:digitaloak/node-red-contrib-digitaloak-mqtt.git`
3. `cd node-red-contrib-digitaloak-mqtt`
4. `npm install`
5. Restart Node-RED
 

