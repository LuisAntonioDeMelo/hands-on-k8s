const k8s = require('@kubernetes/client-node');
const fs = require('fs');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const podManifest = `
apiVersion: v1
kind: Pod
metadata:
    name: node-shima
spec:
    containers:
    - name: pod-shima
      image: tadrianonet/shima-image:latest

`

const pod = JSON.parse(JSON.stringify(k8s.loadYaml(podManifest)));
k8sApi.createNamespacedPod('default', pod).then((res) => {
    console.log('Created pod');
}).catch((err) => {
    console.error(err);
});