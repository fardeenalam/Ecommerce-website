pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Install dependencies and build the React app
                sh 'npm install'
                sh 'npm run build'
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
