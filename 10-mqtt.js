/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
    "use strict";
    var mqtt = require("mqtt");
    var util = require("util");
    var isUtf8 = require('is-utf8');
    var HttpsProxyAgent = require('https-proxy-agent');
    var url = require('url');

    function digitaloak_MQTTInNode(n) {
        RED.nodes.createNode(this, n);
        this.qos = parseInt(n.qos);
        if (isNaN(this.qos) || this.qos < 0 || this.qos > 2) {
            this.qos = 2;
        }
	this.name = n.name;
        this.broker = n.broker;
        this.brokerConn = RED.nodes.getNode(this.broker);
        this.datatype = n.datatype || "utf8";
        this.unsubscribeAfterFirstMsgRecv = n["unsubscribe-after-first-msg-recv"];
        var node = this;
        if (this.brokerConn) {
            this.status({
                fill: "red",
                shape: "ring",
                text: "node-red:common.status.disconnected"
            });
            this.on("input", function (msg) {
                this.topic = msg.topic;
                this.payload = msg.payload;
                if (this.topic) {
                    if (!/^(#$|(\+|[^+#]*)(\/(\+|[^+#]*))*(\/(\+|#|[^+#]*))?$)/.test(this.topic)) {
                        return this.warn(RED._("mqtt.errors.invalid-topic"));
                    }
                    node.brokerConn.register(this);
                    this.brokerConn.subscribe(this.topic, this.qos, function (topic, payload, packet) {
			// Unsubscribe string format "_unsubscribe:<nodeName>"
			var unsubNode = payload.toString().split(":");
			unsubNode = unsubNode.length === 2 && unsubNode[0] === "_unsubscribe" ? unsubNode[1] : null;
			// Check if unsubscribe action is related to this specific node
			if (unsubNode === node.name) {
			    node.brokerConn.unsubscribe(topic,node.id,true);
			    return;
			}
			// Don't pass unsubscribe msg through nodes
			if (unsubNode) return;
                        if (node.datatype === "buffer") {
                            // payload = payload;
                        } else if (node.datatype === "base64") {
                            payload = payload.toString('base64');
                        } else if (node.datatype === "utf8") {
                            payload = payload.toString('utf8');
                        } else if (node.datatype === "json") {			    
                            if (isUtf8(payload)) {
                                payload = payload.toString();
                                try {
                                    payload = JSON.parse(payload);
                                } catch (e) {
                                    node.error(RED._("mqtt.errors.invalid-json-parse"), {
                                        payload: payload,
                                        topic: topic,
                                        qos: packet.qos,
                                        retain: packet.retain
                                    });
                                    return;
                                }
                            } else {
                                node.error((RED._("mqtt.errors.invalid-json-string")), {
                                    payload: payload,
                                    topic: topic,
                                    qos: packet.qos,
                                    retain: packet.retain
                                });
                                return;
                            }
                        } else {
                            if (isUtf8(payload)) {
                                payload = payload.toString();
                            }
                        }
                        var msg = {
                            topic: topic,
                            payload: payload,
                            qos: packet.qos,
                            retain: packet.retain,
                        };
                        if ((node.brokerConn.broker === "localhost") || (node.brokerConn.broker === "127.0.0.1")) {
                            msg._topic = topic;
                        }
                        // Unsubscribe if checkbox set
                        if (node.unsubscribeAfterFirstMsgRecv) {
                            node.brokerConn.unsubscribe(topic, node.id, true);
                        }
			
                    	node.send(msg);
                    }, this.id);
                    if (this.brokerConn.connected) {
                        node.status({
                            fill: "green",
                            shape: "dot",
                            text: "node-red:common.status.connected"
                        });
                    }              
                } else {
                    //this.error(RED._("mqtt.errors.not-defined"));
		    node.send(msg);
                }
            });
            this.on('close', function (removed, done) {
                if (node.brokerConn) {
                    node.brokerConn.unsubscribe(node.topic, node.id, removed);
                    node.brokerConn.deregister(node, done);
                }
            });
        } else {
            this.error(RED._("mqtt.errors.missing-config"));
        }
    }
    RED.nodes.registerType("digitaloak-mqtt-in", digitaloak_MQTTInNode);

};