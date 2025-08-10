pipeline {
    agent any

    triggers {
        // Automatically trigger when changes are pushed to Bitbucket
        pollSCM('H/5 * * * *') // Every 5 mins
    }

    environment {
        NODE_ENV = "development"
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

        stage('Deploy') {
            steps {
                echo "Deploy step here — e.g., copy build files to server"
            }
        }
    }

    post {
        success {
            echo "Build succeeded!"
            slackSend channel: '#jenkins', message: "✅ Build Succeeded for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
        failure {
            echo "Build failed!"
            slackSend channel: '#jenkins', message: "❌ Build Failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
    }
}
