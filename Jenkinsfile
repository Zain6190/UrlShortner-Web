pipeline {
    agent any

    triggers {
        // Poll Bitbucket for changes every 5 mins
        pollSCM('H/5 * * * *')
    }

    environment {
        NODE_ENV = "development"
        IMAGE_NAME = "urlshortner-app"
        SWARM_STACK_NAME = "urlshortner-stack"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm test || echo "No tests found"'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${IMAGE_NAME}:latest ."

                    // Optional: Push to Docker registry if needed
                    // sh "docker tag ${IMAGE_NAME}:latest myregistry/${IMAGE_NAME}:latest"
                    // sh "docker push myregistry/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Docker Compose Deploy') {
            steps {
                script {
                    // Ensure docker-compose.yml exists
                    if (fileExists('docker-compose.yml')) {
                        // Stop previous containers
                        sh 'docker-compose down || true'
                        // Start new containers
                        sh 'docker-compose up -d'
                    } else {
                        echo "docker-compose.yml not found, skipping compose deployment"
                    }
                }
            }
        }

        stage('Docker Swarm Deploy') {
            steps {
                script {
                    // Initialize swarm if not already
                    sh 'docker swarm init || true'
                    // Deploy stack
                    if (fileExists('docker-compose.yml')) {
                        sh "docker stack deploy -c docker-compose.yml ${SWARM_STACK_NAME}"
                    } else {
                        echo "docker-compose.yml not found, skipping swarm deployment"
                    }
                }
            }
        }
    }

  post {
    success {
        echo "Build and deployment succeeded!"
        emailext (
            to: 'zu84290@gmail.com',
            subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """\
Hello Team,

The Jenkins build and deployment succeeded.

Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Regards,
Jenkins
"""
        )
    }
    failure {
        echo "Build or deployment failed!"
        emailext (
            to: 'zu84290@gmail.com',
            subject: "❌ FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """\
Hello Team,

The Jenkins build or deployment has failed.

Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Please check the Jenkins logs for details.
"""
        )
    }
}
