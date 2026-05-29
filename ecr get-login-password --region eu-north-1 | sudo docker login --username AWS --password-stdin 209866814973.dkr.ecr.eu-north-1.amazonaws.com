{
    "repository": {
        "repositoryArn": "arn:aws:ecr:eu-north-1:209866814973:repository/attoria",
        "registryId": "209866814973",
        "repositoryName": "attoria",
        "repositoryUri": "209866814973.dkr.ecr.eu-north-1.amazonaws.com/attoria",
        "createdAt": "2026-05-29T02:24:38.317000+02:00",
        "imageTagMutability": "MUTABLE",
        "imageScanningConfiguration": {
            "scanOnPush": false
        },
        "encryptionConfiguration": {
            "encryptionType": "AES256"
        }
    }
}
