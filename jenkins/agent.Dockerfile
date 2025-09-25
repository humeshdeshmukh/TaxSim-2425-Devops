# devops/jenkins/agent.Dockerfile
FROM jenkins/agent:latest-jdk11
USER root
RUN apt-get update && apt-get install -y docker.io kubectl trivy
USER jenkins
