
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
        stage('Build') {
            steps {
                // Install dependencies and build the React app
                sh '/home/ec2-user/.nvm/versions/node/v14.21.3/bin/npm install'
                sh '/home/ec2-user/.nvm/versions/node/v14.21.3/bin/npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Copy the built files to /home/ec2-user/amazon on your AWS instance using SSH
                script {
                    sshagent(credentials: ['keyPair.pem']) {
                        // Use the 'IP' credential for the EC2 instance's IP address
                        sh 'scp -i keyPair.pem -r ./build ec2-user@' + credentials('IP') + ':/home/ec2-user/amazon'
                    }
                }
            }
        }
    }
}

