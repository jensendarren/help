# Point Network Notes

## Copy keys

```
cp _local/mnemonic/mnemonic-jensendarren.json ~/.point/keystore/key.json
cp _local/mnemonic/mnemonic-pointnetwork.json ~/.point/keystore/key.json
```

## Getting zappdev or e2e node working

REMEMBER TO BUILD THE IMAGE WHEN TESTS A NEW BRANCH:

```
build-image
```

* **BEFORE TESTING** `zappdev` ENVIORNMENT UPDATE `.env.zappdev` with the new `POINT_NODE_VERSION`
* **BEFORE TESTING** `e2e` ENVIORNMENT UPDATE `.env` with the new `POINT_NODE_VERSION`

Run this!

```
dclean
npm run build
point-zappdev up -d
point-zappdev logs -f point_node
dexec point_node
point-browser-owner
./scripts/deploy-sites.sh pointsocial.z --contracts
./scripts/deploy-sites.sh twitter.z --contracts
./scripts/deploy-sites.sh blog.z --contracts
./scripts/deploy-sites.sh email.z --contracts

export DATADIR=/data
./scripts/deploy-sites.sh pointsocial.z --dev --contracts
./scripts/deploy-sites.sh twitter.z --dev --contracts

point-browser-docker-3 (if you want to be a 'visitor'!)
point-zappdev down
```

If using the `localnet` environment then in docker-compose.yml just mount examples foldeer and add the `DEV_ZAPP_HOST:` key to the environments section.

## Starting different node environments

YNet does not use docker so just run:

```
npm i
npm run build
npm run start
point-browser <- from pointsdk
```

For zappdev, e2e and test environments use the following docker alias

```
point-zappdev
point-e2e
point-test
```

Since these are all alias for the `docker compose` command they all should work in the same way, for example:

```
point-zappdev up -d
...etc
```

## Starting different browser environments

Following browser alias are available;

```
point-browser           (YNet & e2e)
point-browser-owner     (zappdev owner)
point-browser-visitor   (zappdev visitor)
```

### Test Point Node pre-release build

First tag and push

```
git tag -a v0.1.47-test
git push origin v0.1.47-test
```

Then check the build and mark it as `pre-release` (click edit release in github)

Now download the macos build and extract the zip, then, on a terminal you need to run

```
cd ~/Downloads/bin/macos
nvm use 14.17.5
xattr -cr point
./point
```

Open a Point Browser and test! :)

## Deploy to YNET (example twitterdev.z)

1. Copy the `key.json` for the account you want to use (see above)
1. Start the node and browser in Ynet (see above)
1. Config `truffle-config` to setup YNet environment
1. Download all latest Identities `truffle exec scripts/identityImporter.js --download 0x1411f3dC11D60595097b53eCa3202c34dbee0CdA --network ynet`
1. Download the current twitter data `truffle exec scripts/twitterImporter.js --download 0x1411f3dC11D60595097b53eCa3202c34dbee0CdA TIMESTAMP-identity.json --network ynet`
1. Copy the contract you want to migrate `cp example/twitter.z/contracts/Twitter.sol truffle/contracts/.`
1. Compile: `truffle compile`
1. Run the deploy script for the Twitter Dev Zapp (includes contract): `./scripts/deploy-sites.sh twitter.z --dev --contracts`
1. Get the deployed contract address by running in truffle console: `(await Identity.at('0x1411f3dC11D60595097b53eCa3202c34dbee0CdA')).ikvGet('twitterdev', 'zweb/contracts/address/Twitter')`
1. Upload the data `truffle exec scripts/twitterImporter.js --upload NEW_CONTRACT_ADDRESS TIMESTAMP-twitter.json --network ynet`
```

### Useful docker commands

```
docker run -it --entrypoint bash pointnetwork/pointnetwork_deployer:dev
docker run -it --entrypoint bash pointnetwork/pointnetwork_node:develop
docker run -it --entrypoint bash -v $(pwd)/scripts:/app/scripts pointnetwork/pointnetwork_node:dev
```

## Deploy a new Identity Contract instance in YNET

Process to deploy a new Identity contract in YNet:

1. Switch to `develop` branch (or the branch of the original contract) and run `truffle compile`
1. Uncomment YNET configuration in `truffle-config` file
1. Compile the contracts `truffle compile`
1. Download the data from the existing Identity contract using: `truffle exec scripts/identityImporter.js --download IDENTITY_CONTRACT_ADDRESS --network ynet`
1. Switch to `feature/zapp_versions` (or the branch where the new contract exists)
1. Compile the contracts `truffle compile` again (since they are updated now!)
1. Check `identity.json` is the latest (timestamp and ikvImportKV interface)
1. Run `truffle migrate -f 2 --to 2 --network ynet` which will deploy the updated Identity contract to YNet
1. Upload the Identity data to the new Identity contract instance using: `truffle exec scripts/identityImporter.js --upload NEW_IDENTITY_ADDRESS TIMESTAMP-identity.json --network ynet`
1. Verify the Identities have been migrated by interacting with the Smart Contract in the truffle console using calls to `ikvGet` and other functions to check the data using `truffle console --network ynet`
1. Update `config/default.yaml` and set `identity_contract_address` to the `NEW_IDENTITY_ADDRESS`
1. Merge these changes (the updated Identity contract, updated default.yaml etc) into the `develop` branch
1. Switch to the `develop` branch and pull all changes from remote and make sure the branch is clean and up to date
1. Run `./scripts/update-version.js NEW_NODE_VERSION` to tag, build and deploy the Point Node at that specific SHA
1. Switch to `pointnetwork-dashboard` repo and update the `NODE_VERSION` in `./shared/constants.ts`
1. Commit the changes you make to the `pointnetwork-dashboard` repo.
1. Then run `./scripts/update_version.sh "NEW_DASHBOARD_VERSION"` to tag, build and deploy the Point Dashboard at that specific SHA

After completing the above steps, we should expect to have:

* A new version of the Identity contract deployed
* All the Identities and Zapp KV data migrated across to the new Identity Contract
* The Point Node will be updated to use the new Identity contract address in YNet
* The Point Dashboard will be updated to use the latest version of the Point Node.

You can test using either the Point Node binary, Point Dasbboard binary or build the Point Node from source!

### Tagging pointnetwork node releases to build docker and publish image via Github Actions

1. Switch to `develop` branch, make sure it is up to date and has no unstaged changes
1. Run `./scripts/update-version.js 0.1.41` replace `0.1.41` with the next version

NOTE: In case something goes wrong, we need to check whether the specified version tag was created via `git tag -l` and if it was, remove it via `git tag -d v0.1.41` or whatever the version was. Then figure out the problem and retry.

### Tagging pointnetwork dashboard releases to build docker and publish image via Github Actions

1. Switch to `pointnetwork-dashboard`
1. Make changes to the dashboard code as required
1. (OPTIONAL) if required, update the `NODE_VERSION` in `./shared/constants.ts`
1. Commit the changes you make to the `pointnetwork-dashboard` repo.
1. Then run `./scripts/update_version.sh "NEW_DASHBOARD_VERSION"` to tag, build and deploy the Point Dashboard at that specific SHA

### Testing Identity Contract

```
// Load instance and test
id = await Identity.at('0xC59aB13518e46BD6e75bd38D396E9ef2B38eca7A')

// register an identity
id.register('twitter','0x916f8E7566Dd63D7c444468CaDeA37e80f7F8048','0x6b6579636f6465686173680000000000000000000000000000000000000000','0x6b6579636f6465686173680000000000000000000000000000000000000001')

// Put kv items for the identity
id.ikvPut('twitter', 'zweb/contracts/address/Twitter', '0x0c96E48A58fC4ba77B5b33AC73865054885FfdF4', '0.1.0')
id.ikvPut('twitter', 'zweb/contracts/abi/Twitter','5ea18c76ac40b97b24a84d4fb0d43c36eb1e28eb7ded8380e26ec9253229f811', '0.1.0')
id.ikvPut('twitter', '::rootDir','6fadb1d031dbb795d091d03c2b532586dd4e4f602464e09cf418933d4932a15b', '0.1.0')
id.ikvPut('twitter', 'zdns/routes','0x1782fd9de28bff7ed5fffffd702caa022c851d89f019d54e7706512a469a5d3a', '0.1.0')

// Get the values back from the contract
```

### Build Deployer Docker Image and Push

Do this, my friend:

```
docker login
docker build -f deployer.Dockerfile -t jensendarren/contract-deployer:develop .
docker push jensendarren/contract-deployer:develop
```