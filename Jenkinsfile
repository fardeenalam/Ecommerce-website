
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
        nodejs "Node" // Reference the NodeJS installation by name
    }
    
    stages {
        stage('Clear npm cache') {
            steps {
                // Clear the npm cache
                sh 'npm cache clean --force'
            }
        }

        stage('Checkout') {
            steps {
                // Check out the source code from your Git repository
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {                   
                    // Install dependencies and build the React app using specific npm and Node.js versions
                    sh 'npm install'
                    sh 'npm run build'
                }
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
            // Add any post-deployment steps or notifications here
            echo 'Deployment successful'
        }
        failure {
            // Handle deployment failures here
            echo 'Deployment failed'
        }
    }
}





