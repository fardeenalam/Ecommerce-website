
// Run these commands on terminal to install nodeJS otherwise Build Stage will be failed

// # Install nvm (Node Version Manager) as the ec2-user
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

// # Load nvm
// export NVM_DIR="$HOME/.nvm"
// [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

// # Install Node.js (e.g., version 14)
// nvm install 14

// # Use the installed Node.js version
// nvm use 14

// # Verify npm installation
// npm -v



pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile in the project root directory
                script {
                    def dockerImage = docker.build('amazon-clone:latest', '.')
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                // Use the Docker image to execute npm commands
                script {
                    dockerImage.inside('-v /var/run/docker.sock:/var/run/docker.sock') {
                        // Install project dependencies
                        sh 'npm install'

                        // Build your project
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Copy the built files to /home/ec2-user/amazon on your AWS instance using SSH
                script {
                    def awsInstanceIP = credentials('IP')

                    // Use the 'keyPair.pem' credential for SSH
                    sshagent(credentials: ['keyPair.pem']) {
                        sh "scp -i keyPair.pem -r ./build ec2-user@${awsInstanceIP}:/home/ec2-user/amazon"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}






