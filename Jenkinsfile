
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

    tools {
        nodejs 'Node'
    }
    

    stages {

        // stage('Install Node.js') {
        //     steps {
        //         sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash'
        //         sh 'export NVM_DIR="/var/jenkins_home/.nvm"' // Specify the correct path
        //         sh '[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" '
        //         sh 'nvm install 16'
        //         sh 'nvm use 16'
        //     }
        // }

        // stage('Checkout') {
        //     steps {
        //         // Checkout the 'main' branch from the Git repository
        //         git branch: 'main', url: 'https://github.com/fardeenalam/Ecommerce-website.git'
        //     }
        // }
        
        stage('Build') {
            steps {
                sh 'npm config rm proxy'
                sh 'npm config rm https-proxy'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def awsInstanceIP = credentials('IP')

                    // Use the 'keyPair.pem' credential for SSH
                    sshagent(credentials: ['keyPair.pem']) {
                        // Copy the built files to /home/ec2-user/amazon on your AWS instance using SSH
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




