# Quick Commands

# Docker compose local
cd devops/docker
docker-compose up --build

# Build docker image
docker build -t humesh/taxsim:dev -f devops/docker/Dockerfile ..

# Minikube / k8s
minikube start
kubectl apply -k devops/k8s/overlays/dev

# ArgoCD
kubectl apply -n argocd -f devops/argocd/application.yaml

# Trivy
devops/security/trivy-scan.sh humesh/taxsim:dev
