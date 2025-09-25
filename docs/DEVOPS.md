# DevOps Playground - TaxSim-2425

This folder contains all starter DevOps artifacts to run a production-like CI/CD & infra locally using WSL + Docker + Kubernetes.

## Quickstart (WSL)

1. Install prerequisites:
   - WSL2 (Ubuntu)
   - Docker Desktop (WSL backend) or docker-ce in WSL
   - kubectl, kind or minikube
   - helm, trivy
   - Jenkins (docker) or GitLab CE (docker)
2. Start local stack:
   - `cd devops/docker && docker-compose up --build`
3. Run k8s (minikube):
   - `minikube start --driver=docker`
   - `kubectl apply -k devops/k8s/overlays/dev`
4. Install ArgoCD (optional) and apply `devops/argocd/application.yaml`.
5. Monitoring:
   - `helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring --create-namespace`
6. CI:
   - Use `devops/jenkins/Jenkinsfile` for Jenkins pipelines.
   - Use `devops/gitlab/.gitlab-ci.yml` for GitLab CI.
7. Security:
   - Run `devops/security/trivy-scan.sh` to scan images.
8. IaC:
   - Use `devops/iac/ansible/playbook.yml` to bootstrap machines.
   - Use Terraform local docker provider to build/run containers.

## Tips

- Use namespaces: dev, staging, prod.
- Use ArgoCD for GitOps sync.
- Use Helm for templating and release management.
- Use OPA/Gatekeeper to enforce policies.
