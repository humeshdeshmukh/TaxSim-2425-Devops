pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:18
      command:
      - cat
      tty: true
    - name: docker
      image: docker:20.10-dind
      securityContext:
        privileged: true
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
  volumes:
    - name: dind-storage
      emptyDir: {}
"""
        }
    }

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
                container('node') {
                    sh '''
                    echo "Installing project dependencies..."
                    npm install --legacy-peer-deps
                    '''
                }
            }
        }

        stage('Build App') {
            steps {
                container('node') {
                    sh '''
                    echo "Running build..."
                    npm run build
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh '''
                    echo "Building Docker image inside Minikube..."
                    eval $(minikube docker-env)
                    docker build -t $IMAGE_NAME -f docker/Dockerfile .
                    '''
                }
            }
        }
        stage('Setup Tools') {
        steps {
        sh '''
        echo "Installing kubectl..."
        curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
        chmod +x kubectl
        mv kubectl /usr/local/bin/
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
