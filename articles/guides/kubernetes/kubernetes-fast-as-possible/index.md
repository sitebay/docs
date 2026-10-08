---
slug: kubernetes-fast-as-possible
description: 'Quick Kubernetes setup for WordPress on SiteBay.'
keywords: ["kubernetes", "wordpress", "deployment", "nginx", "SiteBay"]
tags: ["wordpress", "kubernetes", "nginx", "deployment", "SiteBay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified_by:
  name: SiteBay
modified: 2024-12-04
published: 2024-04-27
title: 'Kubernetes Quick Start'
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Deploy WordPress on Kubernetes with SiteBay.

## Quick Setup

1. Sign up for SiteBay
2. Create Kubernetes cluster (choose region near audience)
3. Deploy WordPress with NGINX via Helm
4. Configure domain and SSL
5. Monitor and scale as needed

## Deploy NGINX

```yaml
# nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f nginx-deployment.yaml
kubectl get deployments
```

## Why Kubernetes + SiteBay

- **Scalability** - Handle traffic spikes
- **High availability** - Auto-restart failed containers
- **Speed** - Fast deployments and updates
- **Single dashboard** - Manage everything in one place
