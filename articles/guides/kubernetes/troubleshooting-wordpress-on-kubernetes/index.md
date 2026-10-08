---
slug: troubleshooting-wordpress-on-kubernetes
description: 'Troubleshoot WordPress on Kubernetes with SiteBay.'
keywords: ["kubernetes", "wordpress", "troubleshooting", "nginx", "SiteBay"]
tags: ["wordpress", "kubernetes", "nginx", "SiteBay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified_by:
  name: SiteBay
modified: 2024-12-04
published: 2024-04-27
image: DeployNGINX_SiteBay.png
title: 'Troubleshooting WordPress on Kubernetes'
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Common issues and solutions for WordPress on Kubernetes.

## Check Pod Status

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

## Common Issues

| Problem | Solution |
|---------|----------|
| Pod CrashLoopBackOff | Check logs, verify config |
| Image pull errors | Verify image name/registry access |
| Service not accessible | Check Ingress/LoadBalancer config |
| Slow performance | Check resource limits, scale up |
| Database connection failed | Verify DB credentials/network |

## Scaling Issues

```bash
# Check current replicas
kubectl get deployments

# Scale manually
kubectl scale deployment wordpress --replicas=3

# Check HPA status
kubectl get hpa
```

## NGINX Troubleshooting

```bash
# Check NGINX config
kubectl exec -it <nginx-pod> -- nginx -t

# Reload config
kubectl exec -it <nginx-pod> -- nginx -s reload
```

## SiteBay Tools

- Grafana dashboards for metrics
- PostHog for user analytics
- Built-in logging
- Staging environments for testing
