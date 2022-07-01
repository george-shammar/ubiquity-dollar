import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { UbiquityAlgorithmicDollarManager } from "../artifacts/types/UbiquityAlgorithmicDollarManager";
import { StakingShareV2 } from "../artifacts/types/StakingShareV2";
import { Staking } from "../artifacts/types/Staking";
import { IMetaPool } from "../artifacts/types/IMetaPool";
import { StakingFormulas } from "../artifacts/types/StakingFormulas";
import { MasterChefV2 } from "../artifacts/types/MasterChefV2";
import { StakingV2 } from "../artifacts/types/StakingV2";
import { UbiquityGovernance } from "../artifacts/types/UbiquityGovernance";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, ethers } = hre;

  // MIGRATION
  const toMigrateOriginals = [
    "0x89eae71b865a2a39cba62060ab1b40bbffae5b0d",
    "0xefc0e701a824943b469a694ac564aa1eff7ab7dd",
    "0xa53a6fe2d8ad977ad926c485343ba39f32d3a3f6",
    "0x7c76f4db70b7e2177de10de3e2f668dadcd11108",
    "0x4007ce2083c7f3e18097aeb3a39bb8ec149a341d",
    "0xf6501068a54f3eab46c1f145cb9d3fb91658b220",
    "0x10693e86f2e7151b3010469e33b6c1c2da8887d6",
    "0xcefd0e73cc48b0b9d4c8683e52b7d7396600abb2",
    "0xd028babbdc15949aaa35587f95f9e96c7d49417d",
    "0x9968efe1424d802e1f79fd8af8da67b0f08c814d",
    "0xd3bc13258e685df436715104882888d087f87ed8",
    "0x0709b103d46d71458a71e5d81230dd688809a53d",
    "0xe3e39161d35e9a81edec667a5387bfae85752854",
    "0x7c361828849293684ddf7212fd1d2cb5f0aade70",
    "0x9d3f4eeb533b8e3c8f50dbbd2e351d1bf2987908",
    "0x865dc9a621b50534ba3d17e0ea8447c315e31886",
    "0x324e0b53cefa84cf970833939249880f814557c6",
    "0xce156d5d62a8f82326da8d808d0f3f76360036d0",
    "0x26bdde6506bd32bd7b5cc5c73cd252807ff18568",
    "0xd6efc21d8c941aa06f90075de1588ac7e912fec6",
    "0xe0d62cc9233c7e2f1f23fe8c77d6b4d1a265d7cd",
    "0x0b54b916e90b8f28ad21da40638e0724132c9c93",
    "0x629cd43eaf443e66a9a69ed246728e1001289eac",
    "0x0709e442a5469b88bb090dd285b1b3a63fb0c226",
    "0x94a2ffdbdbd84984ac7967878c5c397126e7bbbe",
    "0x51ec66e63199176f59c80268e0be6ffa91fab220",
    "0x0a71e650f70b35fca8b70e71e4441df8d44e01e9",
    "0xc1b6052e707dff9017deab13ae9b89008fc1fc5d",
    "0x9be95ef84676393588e49ad8b99c9d4cdfdaa631",
    "0xfffff6e70842330948ca47254f2be673b1cb0db7",
    "0x0000ce08fa224696a819877070bf378e8b131acf",
    "0xc2cb4b1bcaebaa78c8004e394cf90ba07a61c8f7",
    "0xb2812370f17465ae096ced55679428786734a678",
    "0x3eb851c3959f0d37e15c2d9476c4adb46d5231d1",
    "0xad286cf287b91719ee85d3ba5cf3da483d631dba",
    "0xbd37a957773d883186b989f6b21c209459022252",
  ];
  const toMigrateLpBalances = [
    "1301000000000000000",
    "3500000000000000000000",
    "9351040526163838324896",
    "44739174270101943975392",
    "74603879373206500005186",
    "2483850000000000000000",
    "1878674425540571814543",
    "8991650309086743220575",
    "1111050988607803612915",
    "4459109737462155546375",
    "21723000000000000000000",
    "38555895255762442000000",
    "5919236274824521937931",
    "1569191092350025897388",
    "10201450658519659933880",
    "890339946944155414434",
    "5021119790948940093253",
    "761000000000000000000",
    "49172294677407855270013",
    "25055256356185888278372",
    "1576757078627228869179",
    "3664000000000000000000",
    "1902189597146391302863",
    "34959771702943278635904",
    "9380006436252701023610",
    "6266995559166564365470",
    "100000000000000000000",
    "3696476262155265118082",
    "740480000000000000000",
    "2266000000000000000000",
    "1480607760433248019987",
    "24702171480214199310951",
    "605000000000000000000",
    "1694766661387270251234",
    "14857000000000000000000",
    "26000000000000000000",
  ];
  const toMigrateWeeks = [
    "176",
    "30",
    "208",
    "208",
    "208",
    "32",
    "208",
    "208",
    "4",
    "1",
    "67",
    "208",
    "208",
    "109",
    "12",
    "29",
    "1",
    "1",
    "3",
    "4",
    "7",
    "1",
    "128",
    "2",
    "4",
    "3",
    "208",
    "6",
    "1",
    "208",
    "2",
    "1",
    "12",
    "208",
    "4",
    "208",
  ];

  const [ubqAccount] = await ethers.getSigners();
  const adminAdr = ubqAccount.address;
  deployments.log(
    `*****
    adminAdr address :`,
    adminAdr,
    `
  `
  );
  const opts = {
    from: adminAdr,
    log: true,
  };

  let mgrAdr = "0x4DA97a8b831C345dBe6d16FF7432DF2b7b776d98";
  let stakingV2deployAddress = "";
  let stakingFormulasdeployAddress = "";
  let stakingShareV2deployAddress = "";
  let masterchefV2deployAddress = "";

  // calculate end locking period block number
  // 1 week = 45361 blocks = 2371753*7/366

  const UBQ_MINTER_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("UBQ_MINTER_ROLE")
  );
  const UBQ_BURNER_ROLE = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("UBQ_BURNER_ROLE")
  );

  if (mgrAdr.length === 0) {
    const mgr = await deployments.deploy("UbiquityAlgorithmicDollarManager", {
      args: [adminAdr],
      ...opts,
    });
    mgrAdr = mgr.address;
  }

  const mgrFactory = await ethers.getContractFactory(
    "UbiquityAlgorithmicDollarManager"
  );

  const manager: UbiquityAlgorithmicDollarManager = mgrFactory.attach(
    mgrAdr // mgr.address
  ) as UbiquityAlgorithmicDollarManager;

  const ubqFactory = await ethers.getContractFactory("UbiquityGovernance");
  const ubqGovAdr = "0x4e38D89362f7e5db0096CE44ebD021c3962aA9a0";
  const ubiquityGovernance: UbiquityGovernance = ubqFactory.attach(
    ubqGovAdr
  ) as UbiquityGovernance;

  deployments.log(
    `UbiquityAlgorithmicDollarManager deployed at:`,
    manager.address
  );
  const currentStakingAdr = await manager.stakingContractAddress();
  deployments.log("current Staking Adr :", currentStakingAdr);
  const currentMSAdr = await manager.masterChefAddress();
  deployments.log("current Masterchef Adr :", currentMSAdr);
  const ubqBalMS = await ubiquityGovernance.balanceOf(currentMSAdr);
  deployments.log(`
  current Masterchef UGOV Balance :${ethers.utils.formatEther(ubqBalMS)}
`);

  let tx = await manager
    .connect(ubqAccount)
    .revokeRole(UBQ_MINTER_ROLE, currentMSAdr);
  await tx.wait();
  tx = await manager
    .connect(ubqAccount)
    .revokeRole(UBQ_MINTER_ROLE, currentStakingAdr);
  await tx.wait();
  tx = await manager
    .connect(ubqAccount)
    .revokeRole(UBQ_BURNER_ROLE, currentStakingAdr);
  await tx.wait();

  const isMSMinter = await manager
    .connect(ubqAccount)
    .hasRole(UBQ_MINTER_ROLE, currentMSAdr);
  deployments.log("Master Chef Is minter ?:", isMSMinter);
  const isBSMinter = await manager
    .connect(ubqAccount)
    .hasRole(UBQ_MINTER_ROLE, currentStakingAdr);
  deployments.log("Staking Is minter ?:", isBSMinter);

  // StakingShareV2
  const uri = `{
    "name": "Staking Share",
    "description": "Ubiquity Staking Share V2",
    "image": "https://bafybeifibz4fhk4yag5reupmgh5cdbm2oladke4zfd7ldyw7avgipocpmy.ipfs.infura-ipfs.io/"
  }`;
  if (stakingShareV2deployAddress.length === 0) {
    const stakingShareV2deploy = await deployments.deploy("StakingShareV2", {
      args: [manager.address, uri],
      ...opts,
    });

    stakingShareV2deployAddress = stakingShareV2deploy.address;
  }
  /* */
  const stakingShareV2Factory = await ethers.getContractFactory(
    "StakingShareV2"
  );

  const stakingShareV2: StakingShareV2 = stakingShareV2Factory.attach(
    stakingShareV2deployAddress
  ) as StakingShareV2;

  deployments.log("StakingShareV2 deployed at:", stakingShareV2.address);
  tx = await manager
    .connect(ubqAccount)
    .setStakingShareAddress(stakingShareV2.address);
  await tx.wait();
  const managerStakingShareAddress = await manager.stakingShareAddress();
  deployments.log(
    "StakingShareV2 in Manager is set to:",
    managerStakingShareAddress
  );

  // MasterchefV2
  if (masterchefV2deployAddress.length === 0) {
    const masterchefV2deploy = await deployments.deploy("MasterChefV2", {
      args: [manager.address],
      ...opts,
    });

    masterchefV2deployAddress = masterchefV2deploy.address;
  }

  const masterChefV2Factory = await ethers.getContractFactory("MasterChefV2");

  const masterChefV2: MasterChefV2 = masterChefV2Factory.attach(
    masterchefV2deployAddress
  ) as MasterChefV2;
  deployments.log("MasterChefV2 deployed at:", masterChefV2.address);
  tx = await manager
    .connect(ubqAccount)
    .setMasterChefAddress(masterChefV2.address);
  await tx.wait();
  tx = await manager
    .connect(ubqAccount)
    .grantRole(UBQ_MINTER_ROLE, masterChefV2.address);
  await tx.wait();
  const managerMasterChefV2Address = await manager.masterChefAddress();
  deployments.log(
    "masterChefAddress in Manager is set to:",
    managerMasterChefV2Address
  );
  // Staking Formula

  if (stakingFormulasdeployAddress.length === 0) {
    const stakingFormulas = await deployments.deploy("StakingFormulas", {
      args: [],
      ...opts,
    });
    stakingFormulasdeployAddress = stakingFormulas.address;
  }

  const stakingFormulasFactory = await ethers.getContractFactory(
    "StakingFormulas"
  );

  const bf: StakingFormulas = stakingFormulasFactory.attach(
    stakingFormulasdeployAddress
  ) as StakingFormulas;
  deployments.log("StakingFormulas deployed at:", bf.address);
  // StakingV2

  deployments.log(
    "stakingFormulasdeployAddress :",
    stakingFormulasdeployAddress
  );
  deployments.log("manager.address :", manager.address);
  if (stakingV2deployAddress.length === 0) {
    const stakingV2deploy = await deployments.deploy("StakingV2", {
      args: [
        manager.address,
        stakingFormulasdeployAddress,
        toMigrateOriginals,
        toMigrateLpBalances,
        toMigrateWeeks,
      ],
      ...opts,
    });

    stakingV2deployAddress = stakingV2deploy.address;
  }
  deployments.log("stakingV2deployAddress :", stakingV2deployAddress);
  /* */
  const stakingV2Factory = await ethers.getContractFactory("StakingV2");

  const stakingV2: StakingV2 = stakingV2Factory.attach(
    stakingV2deployAddress
  ) as StakingV2;
  deployments.log("stakingV2 deployed at:", stakingV2.address);
  tx = await stakingV2.setMigrating(true);
  await tx.wait();
  deployments.log("setMigrating to true");
  // send the LP token from staking V1 to V2 to prepare the migration

  const metaPoolAddr = await manager.stableSwapMetaPoolAddress();
  const metaPool = (await ethers.getContractAt(
    "IMetaPool",
    metaPoolAddr
  )) as IMetaPool;

  const stakingLPBal = await metaPool.balanceOf(currentStakingAdr);
  deployments.log("stakingLPBal :", ethers.utils.formatEther(stakingLPBal));

  const stakingFactory = await ethers.getContractFactory("Staking");
  const staking: Staking = stakingFactory.attach(currentStakingAdr) as Staking;
  await staking
    .connect(ubqAccount)
    .sendDust(stakingV2.address, metaPool.address, stakingLPBal);
  const stakingV2LPBal = await metaPool.balanceOf(stakingV2.address);
  deployments.log(
    "all stakingLPBal sent to stakingV2... stakingV2LPBal:",
    ethers.utils.formatEther(stakingV2LPBal)
  );
  // stakingV2 should have the UBQ_MINTER_ROLE to mint staking shares

  tx = await manager
    .connect(ubqAccount)
    .grantRole(UBQ_MINTER_ROLE, stakingV2.address);
  await tx.wait();
  tx = await stakingV2.connect(ubqAccount).setBlockCountInAWeek(46550);
  await tx.wait();
  const blockCountInAWeek = await stakingV2.blockCountInAWeek();
  deployments.log("stakingV2 blockCountInAWeek:", blockCountInAWeek);
  tx = await manager
    .connect(ubqAccount)
    .setStakingContractAddress(stakingV2.address);
  await tx.wait();
  const managerStakingV2Address = await manager.stakingContractAddress();
  deployments.log("StakingV2 in Manager is set to:", managerStakingV2Address);

  const ismasterChefV2Minter = await manager
    .connect(ubqAccount)
    .hasRole(UBQ_MINTER_ROLE, masterChefV2.address);
  deployments.log("MasterChef V2 Is minter ?:", ismasterChefV2Minter);
  const isstakingShareV2Minter = await manager
    .connect(ubqAccount)
    .hasRole(UBQ_MINTER_ROLE, stakingV2.address);
  deployments.log("Staking V2 Is minter ?:", isstakingShareV2Minter);

  // try to migrate test

  deployments.log(`
    That's all folks !
    `);
};
export default func;
func.tags = ["V2"];
