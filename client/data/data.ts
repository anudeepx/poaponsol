import { FolderPlus, Coins, Shield, X } from "lucide-react";

export const events = [
    {
        id: 1,
        title: "Solana Breakpoint 2024",
        year: "2024",
        color: "from-emerald-500/20 to-emerald-900/20",
    },
    {
        id: 2,
        title: "DeFi Summit Amsterdam",
        year: "2024",
        color: "from-primary/20 to-emerald-800/20",
    },
    {
        id: 3,
        title: "Hacker House Tokyo",
        year: "2024",
        color: "from-emerald-400/20 to-primary/20",
    },
    {
        id: 4,
        title: "Web3 Conference Berlin",
        year: "2023",
        color: "from-emerald-600/20 to-emerald-400/20",
    },
];

export const modules = [
    {
        id: 1,
        icon: FolderPlus,
        title: "Create Event Collection",
        subtitle: "Initialize Protocol",
        description:
            "Deploy a certified collection using Metaplex standards. Define event parameters, supply limits, and metadata schemas.",
        features: [
            "Uses Metaplex Certified Collections",
            "Customizable metadata schemas",
            "Supply cap configuration",
            "Automated royalty setup",
        ],
        code: "createCollection({ name, symbol, uri })",
    },
    {
        id: 2,
        icon: Coins,
        title: "Mint Attendance NFTs",
        subtitle: "Distribute Proof",
        description:
            "Generate unique attendance tokens for each participant. Batch minting supported with deterministic addressing.",
        features: [
            "Immutable Proofs of Attendance",
            "Batch minting capabilities",
            "QR code generation",
            "Instant on-chain verification",
        ],
        code: "mintAttendanceNft({ collection, recipient })",
    },
    {
        id: 3,
        icon: Shield,
        title: "Verify Participation",
        subtitle: "Query Protocol",
        description:
            "Cryptographically verify attendance credentials. Query participation history and validate authenticity.",
        features: [
            "Solana-fast, near-zero fees",
            "Cross-event verification",
            "Attendance analytics",
            "Export verification reports",
        ],
        code: "verifyAttendance({ wallet, collection })",
    },
];