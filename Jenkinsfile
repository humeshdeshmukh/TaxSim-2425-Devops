pipeline {
    agent any

    environment {
        IMAGE_NAME = "taxsim:latest"
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                echo "Installing project dependencies..."
                npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build App') {
            steps {
                sh '''
                echo "Running build..."
                npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                echo "Building Docker image inside Minikube..."
                eval $(minikube docker-env)
                docker build -t $IMAGE_NAME -f docker/Dockerfile .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                echo "Applying Kubernetes manifests..."
                kubectl apply -f k8s/base/deployment.yml
                kubectl apply -f k8s/base/service.yml
                kubectl apply -f k8s/base/ingress.yml

                echo "Updating deployment with new image..."
                kubectl set image deployment/taxsim taxsim=$IMAGE_NAME
                kubectl rollout status deployment/taxsim
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment succeeded!"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
