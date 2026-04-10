import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { FlashCard as Card } from '../lib/flashcards';

interface Concept  { id: string; label: string; courses: string[]; group: string; x: number; y: number; }
interface KMEdge   { from: string; to: string; type: 'prerequisite' | 'related' | 'applied-in'; }
interface PhysNode { id: string; x: number; y: number; vx: number; vy: number; }

const ALL_CONCEPTS: Concept[] = [
  { id: "binary-info", label: "Binary Information & Voltage Levels", courses: ["ECE 252"], group: "hardware", x: 203.3, y: 156.1 },
  { id: "logic-gates", label: "Logic Gates & Transistors", courses: ["ECE 252"], group: "hardware", x: 215.2, y: 161.6 },
  { id: "logic-functions", label: "Boolean Logic Functions", courses: ["ECE 252"], group: "hardware", x: 217.1, y: 191.1 },
  { id: "combinational-circuits", label: "Combinational Circuits", courses: ["ECE 252"], group: "hardware", x: 197.2, y: 200.3 },
  { id: "decoders-mux", label: "Decoders & Multiplexers", courses: ["ECE 252"], group: "hardware", x: 190.6, y: 168.4 },
  { id: "adders", label: "Adders & Arithmetic Circuits", courses: ["ECE 252"], group: "hardware", x: 183.5, y: 183.7 },
  { id: "sequential-circuits", label: "Sequential Circuits & Flip-Flops", courses: ["ECE 252"], group: "hardware", x: 172.2, y: 187.5 },
  { id: "fsm", label: "Finite State Machines", courses: ["ECE 252"], group: "hardware", x: 136.6, y: 171.7 },
  { id: "processor-model", label: "Processor Model (ALU, Registers, CU)", courses: ["ECE 252"], group: "hardware", x: 173.2, y: 157.9 },
  { id: "isa", label: "Instruction Set Architecture", courses: ["ECE 252", "CS 354"], group: "hardware", x: 170.3, y: 142.1 },
  { id: "instruction-cycle", label: "Fetch-Decode-Execute Cycle", courses: ["ECE 252"], group: "hardware", x: 164.2, y: 117.5 },
  { id: "io-concepts", label: "I/O: Polling, Interrupts, Memory-Mapped", courses: ["ECE 252"], group: "hardware", x: 167.7, y: 113.1 },
  { id: "abstraction-layers", label: "Abstraction Layers", courses: ["ECE 252"], group: "hardware", x: 194.2, y: 140.2 },
  { id: "c-basics", label: "C Language Fundamentals", courses: ["CS 354"], group: "systems-prog", x: 403.4, y: 86.7 },
  { id: "pointers", label: "Pointers & Address Arithmetic", courses: ["CS 354"], group: "systems-prog", x: 415.2, y: 107.3 },
  { id: "arrays-structs", label: "Arrays, Structs & Unions", courses: ["CS 354"], group: "systems-prog", x: 416.0, y: 128.0 },
  { id: "strings", label: "C Strings & string.h", courses: ["CS 354"], group: "systems-prog", x: 413.7, y: 151.0 },
  { id: "vas", label: "Virtual Address Space Layout", courses: ["CS 354", "CS 537"], group: "memory", x: 156.8, y: 408.8 },
  { id: "heap-management", label: "Heap Allocation & Free Lists", courses: ["CS 354"], group: "memory", x: 165.5, y: 427.1 },
  { id: "placement-policies", label: "Placement Policies (First/Next/Best Fit)", courses: ["CS 354"], group: "memory", x: 163.4, y: 446.6 },
  { id: "coalescing", label: "Block Splitting & Coalescing", courses: ["CS 354"], group: "memory", x: 152.0, y: 453.4 },
  { id: "explicit-free-list", label: "Explicit & Segregated Free Lists", courses: ["CS 354"], group: "memory", x: 142.5, y: 424.9 },
  { id: "assembly-basics", label: "IA-32 Assembly & Registers", courses: ["CS 354"], group: "systems-prog", x: 393.7, y: 104.3 },
  { id: "addressing-modes", label: "Operand Specifiers & Addressing Modes", courses: ["CS 354"], group: "systems-prog", x: 385.9, y: 116.4 },
  { id: "asm-instructions", label: "MOV, LEA, Arithmetic & Shift Instructions", courses: ["CS 354"], group: "systems-prog", x: 359.6, y: 115.8 },
  { id: "condition-codes", label: "Condition Codes, CMP, TEST, SET", courses: ["CS 354"], group: "systems-prog", x: 346.7, y: 112.0 },
  { id: "jumps-loops", label: "Jumps, Loops & Control Flow in Assembly", courses: ["CS 354"], group: "systems-prog", x: 370.8, y: 92.7 },
  { id: "stack-frames", label: "Stack Frames & Calling Conventions", courses: ["CS 354"], group: "systems-prog", x: 362.9, y: 75.8 },
  { id: "buffer-overflow", label: "Buffer Overflow & Stack Smashing", courses: ["CS 354"], group: "systems-prog", x: 351.7, y: 64.5 },
  { id: "cache-design", label: "Cache Design (Sets, Lines, Tags)", courses: ["CS 354"], group: "memory", x: 134.7, y: 437.4 },
  { id: "cache-types", label: "Direct-Mapped, Set-Associative, Fully-Associative", courses: ["CS 354"], group: "memory", x: 100.7, y: 431.0 },
  { id: "cache-writes", label: "Write Policies (Write-Through, Write-Back)", courses: ["CS 354"], group: "memory", x: 84.7, y: 430.7 },
  { id: "cache-performance", label: "Cache Performance & Memory Mountain", courses: ["CS 354"], group: "memory", x: 122.1, y: 406.3 },
  { id: "locality", label: "Spatial & Temporal Locality", courses: ["CS 354", "CS 537", "CS 564"], group: "memory", x: 116.8, y: 404.6 },
  { id: "memory-hierarchy", label: "Memory Hierarchy (L0–Storage)", courses: ["CS 354", "CS 537"], group: "memory", x: 110.1, y: 386.1 },
  { id: "signals", label: "Unix Signals", courses: ["CS 354"], group: "systems-prog", x: 355.3, y: 35.4 },
  { id: "ecf", label: "Exceptional Control Flow", courses: ["CS 354"], group: "systems-prog", x: 393.4, y: 75.1 },
  { id: "linking", label: "Linking: Symbols, Resolution, Relocation", courses: ["CS 354"], group: "systems-prog", x: 403.1, y: 65.1 },
  { id: "object-files", label: "Object Files (ROF, EOF, SOF)", courses: ["CS 354"], group: "systems-prog", x: 425.6, y: 68.8 },
  { id: "build-process", label: "C Build Process (Preprocess→Link)", courses: ["CS 354"], group: "systems-prog", x: 432.6, y: 64.9 },
  { id: "process", label: "Processes & PCB", courses: ["CS 537", "CS 354"], group: "os", x: 344.9, y: 330.5 },
  { id: "threads", label: "Threads & Thread Control Block", courses: ["CS 537"], group: "os", x: 360.7, y: 344.6 },
  { id: "context-switch", label: "Context Switching", courses: ["CS 537", "CS 354"], group: "os", x: 358.0, y: 354.8 },
  { id: "system-calls", label: "System Calls & Traps", courses: ["CS 537", "CS 354", "ECE 252"], group: "os", x: 335.2, y: 385.0 },
  { id: "user-kernel-mode", label: "User/Kernel Mode", courses: ["CS 537", "CS 354"], group: "os", x: 333.3, y: 343.1 },
  { id: "scheduling", label: "CPU Scheduling (FIFO, SJF, STCF, RR)", courses: ["CS 537"], group: "os", x: 325.1, y: 360.4 },
  { id: "mlfq", label: "Multi-Level Feedback Queue", courses: ["CS 537"], group: "os", x: 296.5, y: 353.4 },
  { id: "lottery-scheduling", label: "Lottery & Stride Scheduling", courses: ["CS 537"], group: "os", x: 288.4, y: 361.9 },
  { id: "fork-exec", label: "fork(), exec(), wait()", courses: ["CS 537"], group: "os", x: 314.0, y: 325.1 },
  { id: "page-table", label: "Page Tables & Address Translation", courses: ["CS 537"], group: "memory", x: 133.1, y: 347.4 },
  { id: "tlb", label: "Translation Lookaside Buffer (TLB)", courses: ["CS 537"], group: "memory", x: 134.8, y: 392.8 },
  { id: "multi-level-pt", label: "Multi-Level Page Tables", courses: ["CS 537"], group: "memory", x: 154.3, y: 383.9 },
  { id: "page-replacement", label: "Page Replacement (FIFO, LRU, Clock)", courses: ["CS 537"], group: "memory", x: 166.8, y: 374.4 },
  { id: "demand-paging", label: "Demand Paging & Page Faults", courses: ["CS 537"], group: "memory", x: 183.4, y: 378.6 },
  { id: "thrashing", label: "Thrashing & Working Sets", courses: ["CS 537"], group: "memory", x: 159.5, y: 409.5 },
  { id: "cow", label: "Copy-on-Write", courses: ["CS 537"], group: "memory", x: 161.6, y: 425.4 },
  { id: "locks", label: "Locks (Spinlocks, Ticket Locks, Mutexes)", courses: ["CS 537"], group: "concurrency", x: 524.4, y: 230.0 },
  { id: "atomic-ops", label: "Atomic Operations (xchg, CAS, FAA)", courses: ["CS 537"], group: "concurrency", x: 537.0, y: 250.1 },
  { id: "condition-vars", label: "Condition Variables", courses: ["CS 537"], group: "concurrency", x: 545.0, y: 257.4 },
  { id: "producer-consumer", label: "Producer/Consumer Problem", courses: ["CS 537"], group: "concurrency", x: 525.2, y: 274.8 },
  { id: "race-condition", label: "Race Conditions", courses: ["CS 537", "CS 544"], group: "concurrency", x: 507.4, y: 246.6 },
  { id: "deadlock", label: "Deadlock", courses: ["CS 537", "CS 544"], group: "concurrency", x: 494.2, y: 255.2 },
  { id: "concurrency-bugs", label: "Concurrency Bugs (Atomicity/Order Violations)", courses: ["CS 537"], group: "concurrency", x: 491.7, y: 264.7 },
  { id: "relational-model", label: "Relational Model & Algebra", courses: ["CS 564"], group: "data", x: 748.5, y: 139.5 },
  { id: "sql-basics", label: "SQL: SELECT, JOIN, GROUP BY, Subqueries", courses: ["CS 564", "CS 544"], group: "data", x: 757.0, y: 164.3 },
  { id: "er-modeling", label: "ER Modeling & Schema Design", courses: ["CS 564"], group: "data", x: 757.2, y: 166.6 },
  { id: "normal-forms", label: "Functional Dependencies & BCNF", courses: ["CS 564"], group: "data", x: 740.7, y: 208.9 },
  { id: "buffer-manager", label: "Buffer Manager (Pin Count, Dirty Bit, LRU/Clock)", courses: ["CS 564"], group: "data", x: 734.0, y: 160.9 },
  { id: "heap-files", label: "Heap Files & Record Layout", courses: ["CS 564"], group: "data", x: 725.7, y: 177.1 },
  { id: "bplus-tree", label: "B+ Trees", courses: ["CS 564"], group: "data", x: 700.9, y: 166.0 },
  { id: "hashing", label: "Static & Extendible Hashing", courses: ["CS 564"], group: "data", x: 678.5, y: 167.2 },
  { id: "lsm-tree", label: "LSM Trees (MemTable, SSTables, Compaction)", courses: ["CS 564"], group: "data", x: 711.2, y: 147.7 },
  { id: "external-sort", label: "External Merge Sort", courses: ["CS 564"], group: "data", x: 705.6, y: 136.2 },
  { id: "indexes", label: "Primary, Secondary & Clustered Indexes", courses: ["CS 564"], group: "data", x: 698.2, y: 111.7 },
  { id: "protocol-stack", label: "Internet Protocol Stack (5 Layers)", courses: ["CS 640"], group: "networking", x: 905.0, y: 297.3 },
  { id: "encoding", label: "Signal Encoding (NRZ, NRZI, Manchester, 4B/5B)", courses: ["CS 640"], group: "networking", x: 914.0, y: 319.8 },
  { id: "error-detection", label: "Error Detection (Parity, CRC)", courses: ["CS 640"], group: "networking", x: 921.1, y: 328.9 },
  { id: "ethernet", label: "Ethernet & CSMA/CD", courses: ["CS 640"], group: "networking", x: 918.4, y: 339.8 },
  { id: "sliding-window", label: "Sliding Window Protocol", courses: ["CS 640"], group: "networking", x: 891.7, y: 317.0 },
  { id: "ip-addressing", label: "IP Addressing (Classful, CIDR, Subnetting)", courses: ["CS 640"], group: "networking", x: 884.0, y: 325.4 },
  { id: "dhcp", label: "DHCP", courses: ["CS 640"], group: "networking", x: 867.6, y: 338.3 },
  { id: "nat", label: "NAT (Network Address Translation)", courses: ["CS 640"], group: "networking", x: 835.7, y: 333.7 },
  { id: "ipv6", label: "IPv6", courses: ["CS 640"], group: "networking", x: 876.6, y: 297.1 },
  { id: "routing", label: "Distance Vector Routing & Bellman-Ford", courses: ["CS 640"], group: "networking", x: 859.5, y: 292.7 },
  { id: "bgp", label: "BGP & Inter-AS Routing", courses: ["CS 640"], group: "networking", x: 860.6, y: 279.3 },
  { id: "network-delay", label: "Network Delay (Processing, Queuing, Transmission, Propagation)", courses: ["CS 640"], group: "networking", x: 882.6, y: 243.9 },
  { id: "packet-switching", label: "Packet Switching vs Circuit Switching", courses: ["CS 640"], group: "networking", x: 889.7, y: 281.6 },
  { id: "stp", label: "Spanning Tree Protocol", courses: ["CS 640"], group: "networking", x: 904.0, y: 278.5 },
  { id: "multicast", label: "IP Multicast & IGMP", courses: ["CS 640"], group: "networking", x: 911.2, y: 264.9 },
  { id: "hdfs", label: "HDFS (NameNode, DataNode, Replication)", courses: ["CS 544"], group: "distributed", x: 756.3, y: 489.3 },
  { id: "mapreduce", label: "MapReduce", courses: ["CS 544"], group: "distributed", x: 767.1, y: 505.9 },
  { id: "spark", label: "Spark (RDDs, Transformations, Actions)", courses: ["CS 544"], group: "distributed", x: 756.8, y: 521.1 },
  { id: "kafka", label: "Kafka (Topics, Partitions, Consumer Groups)", courses: ["CS 544"], group: "distributed", x: 762.4, y: 536.3 },
  { id: "kafka-replication", label: "Kafka Replication & Exactly-Once Semantics", courses: ["CS 544"], group: "distributed", x: 736.8, y: 504.5 },
  { id: "file-formats", label: "File Formats (Parquet, Row vs Column Oriented)", courses: ["CS 544"], group: "distributed", x: 734.1, y: 518.1 },
  { id: "oltp-olap", label: "OLTP vs OLAP, Warehouses vs Lakes", courses: ["CS 544"], group: "distributed", x: 714.1, y: 518.4 },
  { id: "grpc-protobuf", label: "gRPC & Protocol Buffers", courses: ["CS 544"], group: "distributed", x: 684.9, y: 523.2 },
  { id: "replication", label: "Replication & Partitioning", courses: ["CS 544"], group: "distributed", x: 721.1, y: 490.6 },
  { id: "cloud", label: "Cloud Computing (IaaS/PaaS, Spot Instances)", courses: ["CS 544"], group: "distributed", x: 718.1, y: 480.1 },
  { id: "acid", label: "ACID Properties", courses: ["CS 544", "CS 564"], group: "data", x: 724.2, y: 82.9 },
  { id: "ml-taxonomy", label: "ML Taxonomy (Supervised/Unsupervised/RL)", courses: ["CS 540"], group: "ai", x: 548.6, y: 535.4 },
  { id: "uninformed-search", label: "Uninformed Search (BFS, DFS, UCS, IDS)", courses: ["CS 540"], group: "ai", x: 551.0, y: 544.4 },
  { id: "informed-search", label: "Informed Search (A*, IDA*, Beam Search)", courses: ["CS 540"], group: "ai", x: 556.6, y: 556.2 },
  { id: "game-theory", label: "Game Theory (Nash Equilibrium, Dominant Strategies)", courses: ["CS 540"], group: "ai", x: 549.8, y: 570.7 },
  { id: "minimax", label: "Minimax & Alpha-Beta Pruning", courses: ["CS 540"], group: "ai", x: 531.4, y: 549.7 },
  { id: "knn", label: "K-Nearest Neighbors", courses: ["CS 540"], group: "ai", x: 521.9, y: 561.6 },
  { id: "naive-bayes", label: "Maximum Likelihood & Naive Bayes", courses: ["CS 540"], group: "ai", x: 501.9, y: 559.7 },
  { id: "linear-regression", label: "Linear Regression & Gradient Descent", courses: ["CS 540"], group: "ai", x: 464.6, y: 537.8 },
  { id: "logistic-regression", label: "Logistic Regression & Classification", courses: ["CS 540"], group: "ai", x: 512.1, y: 529.4 },
  { id: "perceptron", label: "Perceptron & Activation Functions", courses: ["CS 540"], group: "ai", x: 503.5, y: 525.0 },
  { id: "neural-nets", label: "Multi-Layer Perceptron & Backpropagation", courses: ["CS 540"], group: "ai", x: 509.0, y: 491.9 },
  { id: "cnn", label: "Convolutional Neural Networks", courses: ["CS 540"], group: "ai", x: 508.3, y: 473.6 },
  { id: "resnet", label: "ResNets & Residual Connections", courses: ["CS 540"], group: "ai", x: 525.5, y: 513.5 },
  { id: "rnn", label: "Recurrent Neural Networks", courses: ["CS 540"], group: "ai", x: 542.9, y: 499.1 },
  { id: "transformers", label: "Transformers & Attention Mechanism", courses: ["CS 540"], group: "ai", x: 557.4, y: 488.2 },
  { id: "word-embeddings", label: "Word Embeddings & Word2Vec", courses: ["CS 540"], group: "ai", x: 568.4, y: 501.1 },
  { id: "nlp-models", label: "Language Models (n-gram, Perplexity)", courses: ["CS 540"], group: "ai", x: 547.6, y: 531.0 },
  { id: "clustering", label: "Clustering (K-Means, Hierarchical, Spectral)", courses: ["CS 540"], group: "ai", x: 554.2, y: 535.8 },
  { id: "pca", label: "PCA & Dimensionality Reduction", courses: ["CS 540"], group: "ai", x: 549.8, y: 562.3 },
  { id: "rl", label: "Reinforcement Learning & Q-Learning", courses: ["CS 540"], group: "ai", x: 549.0, y: 584.4 },
  { id: "mdp", label: "Markov Decision Processes", courses: ["CS 540"], group: "ai", x: 530.8, y: 547.0 },
  { id: "logic-ai", label: "Propositional & First-Order Logic", courses: ["CS 540"], group: "ai", x: 516.4, y: 561.6 },
];

const ALL_EDGES: KMEdge[] = [
  { from: "binary-info", to: "logic-gates", type: "prerequisite" },
  { from: "logic-gates", to: "logic-functions", type: "prerequisite" },
  { from: "logic-functions", to: "combinational-circuits", type: "prerequisite" },
  { from: "combinational-circuits", to: "decoders-mux", type: "prerequisite" },
  { from: "combinational-circuits", to: "adders", type: "prerequisite" },
  { from: "combinational-circuits", to: "sequential-circuits", type: "prerequisite" },
  { from: "sequential-circuits", to: "fsm", type: "prerequisite" },
  { from: "decoders-mux", to: "processor-model", type: "prerequisite" },
  { from: "adders", to: "processor-model", type: "prerequisite" },
  { from: "fsm", to: "processor-model", type: "prerequisite" },
  { from: "processor-model", to: "isa", type: "prerequisite" },
  { from: "isa", to: "instruction-cycle", type: "prerequisite" },
  { from: "instruction-cycle", to: "assembly-basics", type: "prerequisite" },
  { from: "io-concepts", to: "system-calls", type: "prerequisite" },
  { from: "abstraction-layers", to: "build-process", type: "related" },
  { from: "c-basics", to: "pointers", type: "prerequisite" },
  { from: "pointers", to: "arrays-structs", type: "prerequisite" },
  { from: "pointers", to: "strings", type: "prerequisite" },
  { from: "c-basics", to: "vas", type: "prerequisite" },
  { from: "vas", to: "heap-management", type: "prerequisite" },
  { from: "heap-management", to: "placement-policies", type: "prerequisite" },
  { from: "heap-management", to: "coalescing", type: "prerequisite" },
  { from: "heap-management", to: "explicit-free-list", type: "prerequisite" },
  { from: "assembly-basics", to: "addressing-modes", type: "prerequisite" },
  { from: "addressing-modes", to: "asm-instructions", type: "prerequisite" },
  { from: "asm-instructions", to: "condition-codes", type: "prerequisite" },
  { from: "condition-codes", to: "jumps-loops", type: "prerequisite" },
  { from: "jumps-loops", to: "stack-frames", type: "prerequisite" },
  { from: "stack-frames", to: "buffer-overflow", type: "prerequisite" },
  { from: "arrays-structs", to: "buffer-overflow", type: "related" },
  { from: "build-process", to: "object-files", type: "prerequisite" },
  { from: "object-files", to: "linking", type: "prerequisite" },
  { from: "memory-hierarchy", to: "cache-design", type: "prerequisite" },
  { from: "locality", to: "cache-design", type: "prerequisite" },
  { from: "cache-design", to: "cache-types", type: "prerequisite" },
  { from: "cache-design", to: "cache-writes", type: "prerequisite" },
  { from: "cache-types", to: "cache-performance", type: "prerequisite" },
  { from: "vas", to: "page-table", type: "prerequisite" },
  { from: "page-table", to: "tlb", type: "prerequisite" },
  { from: "page-table", to: "multi-level-pt", type: "prerequisite" },
  { from: "page-table", to: "demand-paging", type: "prerequisite" },
  { from: "demand-paging", to: "page-replacement", type: "prerequisite" },
  { from: "page-replacement", to: "thrashing", type: "prerequisite" },
  { from: "fork-exec", to: "cow", type: "related" },
  { from: "locality", to: "tlb", type: "related" },
  { from: "locality", to: "cache-performance", type: "related" },
  { from: "process", to: "threads", type: "prerequisite" },
  { from: "process", to: "context-switch", type: "prerequisite" },
  { from: "process", to: "fork-exec", type: "prerequisite" },
  { from: "context-switch", to: "scheduling", type: "prerequisite" },
  { from: "scheduling", to: "mlfq", type: "prerequisite" },
  { from: "scheduling", to: "lottery-scheduling", type: "prerequisite" },
  { from: "user-kernel-mode", to: "system-calls", type: "prerequisite" },
  { from: "system-calls", to: "fork-exec", type: "prerequisite" },
  { from: "ecf", to: "signals", type: "prerequisite" },
  { from: "ecf", to: "system-calls", type: "related" },
  { from: "io-concepts", to: "ecf", type: "related" },
  { from: "threads", to: "race-condition", type: "prerequisite" },
  { from: "race-condition", to: "locks", type: "prerequisite" },
  { from: "locks", to: "atomic-ops", type: "prerequisite" },
  { from: "locks", to: "condition-vars", type: "prerequisite" },
  { from: "condition-vars", to: "producer-consumer", type: "prerequisite" },
  { from: "locks", to: "deadlock", type: "related" },
  { from: "race-condition", to: "concurrency-bugs", type: "related" },
  { from: "relational-model", to: "sql-basics", type: "prerequisite" },
  { from: "relational-model", to: "er-modeling", type: "prerequisite" },
  { from: "er-modeling", to: "normal-forms", type: "prerequisite" },
  { from: "heap-files", to: "buffer-manager", type: "prerequisite" },
  { from: "buffer-manager", to: "bplus-tree", type: "prerequisite" },
  { from: "buffer-manager", to: "hashing", type: "prerequisite" },
  { from: "bplus-tree", to: "indexes", type: "prerequisite" },
  { from: "bplus-tree", to: "lsm-tree", type: "related" },
  { from: "bplus-tree", to: "external-sort", type: "related" },
  { from: "locality", to: "buffer-manager", type: "related" },
  { from: "page-replacement", to: "buffer-manager", type: "related" },
  { from: "cache-writes", to: "buffer-manager", type: "related" },
  { from: "protocol-stack", to: "encoding", type: "prerequisite" },
  { from: "protocol-stack", to: "network-delay", type: "prerequisite" },
  { from: "encoding", to: "error-detection", type: "prerequisite" },
  { from: "error-detection", to: "ethernet", type: "prerequisite" },
  { from: "ethernet", to: "stp", type: "prerequisite" },
  { from: "ethernet", to: "sliding-window", type: "prerequisite" },
  { from: "packet-switching", to: "ip-addressing", type: "prerequisite" },
  { from: "ip-addressing", to: "dhcp", type: "prerequisite" },
  { from: "ip-addressing", to: "nat", type: "prerequisite" },
  { from: "ip-addressing", to: "ipv6", type: "prerequisite" },
  { from: "ip-addressing", to: "routing", type: "prerequisite" },
  { from: "routing", to: "bgp", type: "prerequisite" },
  { from: "ip-addressing", to: "multicast", type: "related" },
  { from: "hdfs", to: "replication", type: "prerequisite" },
  { from: "hdfs", to: "mapreduce", type: "prerequisite" },
  { from: "mapreduce", to: "spark", type: "prerequisite" },
  { from: "replication", to: "kafka-replication", type: "related" },
  { from: "kafka", to: "kafka-replication", type: "prerequisite" },
  { from: "file-formats", to: "oltp-olap", type: "related" },
  { from: "grpc-protobuf", to: "hdfs", type: "related" },
  { from: "acid", to: "kafka-replication", type: "related" },
  { from: "sql-basics", to: "oltp-olap", type: "related" },
  { from: "ml-taxonomy", to: "linear-regression", type: "prerequisite" },
  { from: "ml-taxonomy", to: "knn", type: "prerequisite" },
  { from: "ml-taxonomy", to: "clustering", type: "prerequisite" },
  { from: "ml-taxonomy", to: "rl", type: "prerequisite" },
  { from: "uninformed-search", to: "informed-search", type: "prerequisite" },
  { from: "informed-search", to: "game-theory", type: "related" },
  { from: "game-theory", to: "minimax", type: "prerequisite" },
  { from: "knn", to: "naive-bayes", type: "related" },
  { from: "linear-regression", to: "logistic-regression", type: "prerequisite" },
  { from: "logistic-regression", to: "perceptron", type: "prerequisite" },
  { from: "perceptron", to: "neural-nets", type: "prerequisite" },
  { from: "neural-nets", to: "cnn", type: "prerequisite" },
  { from: "cnn", to: "resnet", type: "prerequisite" },
  { from: "neural-nets", to: "rnn", type: "prerequisite" },
  { from: "rnn", to: "transformers", type: "prerequisite" },
  { from: "word-embeddings", to: "transformers", type: "prerequisite" },
  { from: "nlp-models", to: "word-embeddings", type: "prerequisite" },
  { from: "rl", to: "mdp", type: "prerequisite" },
  { from: "clustering", to: "pca", type: "related" },
  { from: "logic-ai", to: "informed-search", type: "related" },
  { from: "cache-design", to: "buffer-manager", type: "applied-in" },
  { from: "page-replacement", to: "buffer-manager", type: "applied-in" },
  { from: "process", to: "hdfs", type: "applied-in" },
  { from: "threads", to: "spark", type: "applied-in" },
  { from: "ip-addressing", to: "hdfs", type: "applied-in" },
  { from: "lsm-tree", to: "kafka", type: "applied-in" },
  { from: "external-sort", to: "spark", type: "applied-in" },
  { from: "locality", to: "bplus-tree", type: "applied-in" },
  { from: "neural-nets", to: "rl", type: "applied-in" },
];

import { ALL_DECKS as _DECKS } from '../lib/flashcards';
const ALL_CARDS: Record<string, Card[]> = Object.fromEntries(_DECKS.map(d => [d.id, d.cards]));

const GROUP_COLORS: Record<string, { stroke: string; fill: string; text: string; dot: string }> = {
  'hardware':     { stroke: '#7dd3fc', fill: '#020f1a', text: '#bae6fd', dot: '#38bdf8' },
  'systems-prog': { stroke: '#67e8f9', fill: '#021018', text: '#a5f3fc', dot: '#22d3ee' },
  'memory':       { stroke: '#a5b4fc', fill: '#07061a', text: '#c7d2fe', dot: '#818cf8' },
  'os':           { stroke: '#c4b5fd', fill: '#0d0820', text: '#ddd6fe', dot: '#a78bfa' },
  'concurrency':  { stroke: '#f9a8d4', fill: '#170510', text: '#fbcfe8', dot: '#f472b6' },
  'data':         { stroke: '#6ee7b7', fill: '#011208', text: '#a7f3d0', dot: '#34d399' },
  'networking':   { stroke: '#fde68a', fill: '#150e00', text: '#fef9c3', dot: '#fbbf24' },
  'distributed':  { stroke: '#fdba74', fill: '#150800', text: '#fed7aa', dot: '#fb923c' },
  'ai':           { stroke: '#fca5a5', fill: '#150202', text: '#fecaca', dot: '#f87171' },
};

const GROUP_LABELS: Record<string, string> = {
  'hardware':     'Hardware',
  'systems-prog': 'Systems Programming',
  'memory':       'Memory Systems',
  'os':           'Operating Systems',
  'concurrency':  'Concurrency',
  'data':         'Data Systems',
  'networking':   'Networking',
  'distributed':  'Distributed Systems',
  'ai':           'AI & Machine Learning',
};

const DEGREE_MAP: Record<string, number> = {};
ALL_EDGES.forEach(e => { DEGREE_MAP[e.from] = (DEGREE_MAP[e.from] || 0) + 1; DEGREE_MAP[e.to] = (DEGREE_MAP[e.to] || 0) + 1; });
const MAX_DEGREE = Math.max(...Object.values(DEGREE_MAP), 1);

const CARD_COUNT_MAP: Record<string, number> = {};
Object.entries(ALL_CARDS).forEach(([id, cs]) => { CARD_COUNT_MAP[id] = cs.length; });
const MAX_CARD_COUNT = Math.max(...Object.values(CARD_COUNT_MAP), 1);

const BG_STARS = Array.from({ length: 220 }, (_, i) => ({
  x: (i * 7919 + 1234) % 1400,
  y: (i * 6271 + 5678) % 1100,
  r: i % 7 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.5,
  op: 0.08 + (i % 8) * 0.035,
}));
const W = 1600; const H = 1200; const R = 11;
const REPULSION = 3800; const SPRING_K = 0.02;
const SPRING_LEN_INTRA = 75; const SPRING_LEN_INTER = 120;
const DAMPING = 0.82; const ANCHOR_K = 0.028;
const BOUND_PAD = 60; const BOUND_K = 0.06;
const ZOOM_MIN = 0.3; const ZOOM_MAX = 3.0; const ZOOM_STEP = 0.12;
const PAN_LIMIT = 700;
const ENERGY_THRESHOLD = 0.4;

const GROUP_ANCHORS: Record<string, { x: number; y: number }> = {
  'ai':           { x: 450,  y: 175 },
  'distributed':  { x: 1120, y: 175 },
  'data':         { x: 630,  y: 400 },
  'networking':   { x: 1200, y: 400 },
  'concurrency':  { x: 530,  y: 620 },
  'os':           { x: 940,  y: 620 },
  'memory':       { x: 280,  y: 860 },
  'systems-prog': { x: 760,  y: 860 },
  'hardware':     { x: 740,  y: 1060 },
};

const LABEL_Y_OFFSET: Record<string, number> = {
  'hardware': 60,
};

// Derived from actual flashcard data; stays in sync automatically
const GROUP_STATS: Record<string, { cards: number; concepts: number }> = Object.fromEntries(
  Object.keys(GROUP_LABELS).map(grp => {
    const concepts = ALL_CONCEPTS.filter(c => c.group === grp);
    const cards    = concepts.reduce((sum, c) => sum + (ALL_CARDS[c.id]?.length ?? 0), 0);
    return [grp, { cards, concepts: concepts.length }];
  })
);
const TOTAL_CARDS = Object.values(GROUP_STATS).reduce((s, v) => s + v.cards, 0);

function FlashCardViewer({ cards, color }: { cards: Card[]; color: typeof GROUP_COLORS[string] }) {
  const [index,   setIndex]   = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = cards.length;
  const card  = cards[index];

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(false);
    setTimeout(() => setIndex(i => (i + dir + total) % total), 130);
  };

  useEffect(() => { setIndex(0); setFlipped(false); }, [cards]);

  return (
    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: color.text + '80' }}>
        Anki · {index + 1} / {total}
      </span>
      <div style={{ position: 'relative', width: '100%', cursor: 'pointer', userSelect: 'none', borderRadius: '8px', border: '1px solid ' + color.stroke + '40', overflow: 'hidden', background: color.fill, display: 'grid' }}
        onClick={e => { e.stopPropagation(); setFlipped(f => !f); }}>
        {[false, true].map(side => (
          <div key={String(side)}
            style={{
              gridArea: '1 / 1',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '16px 12px', textAlign: 'center',
              opacity: flipped === side ? 1 : 0,
              transition: 'opacity 0.15s ease',
              pointerEvents: flipped === side ? 'auto' : 'none',
              visibility: flipped === side ? 'visible' : 'hidden',
            }}>
            <span style={{ fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4, marginBottom: '6px', color: color.text }}>
              {side ? 'back' : 'front · tap to flip'}
            </span>
            <p style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: side ? 400 : 500, color: color.text }}>
              {side ? card.back : card.front}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={e => go(-1, e)} style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + color.stroke + '40', opacity: 0.5, cursor: 'pointer', color: color.text, background: 'none', WebkitAppearance: 'none', appearance: 'none' }}>← prev</button>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', opacity: 0.4, color: color.text }}>{index + 1} / {total}</span>
        <button onClick={e => go(1, e)} style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + color.stroke + '40', opacity: 0.5, cursor: 'pointer', color: color.text, background: 'none', WebkitAppearance: 'none', appearance: 'none' }}>next →</button>
      </div>
    </div>
  );
}

function DetailPanel({ concept, onClose }: { concept: Concept; onClose: () => void }) {
  const col   = GROUP_COLORS[concept.group] ?? GROUP_COLORS['hardware'];
  const cards = ALL_CARDS[concept.id] ?? [];
  return (
    <div style={{ borderRadius: '12px', border: '1px solid ' + col.stroke + '60', padding: '16px', position: 'relative', background: col.fill + 'ec' }}>
      <button onClick={onClose}
        style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', opacity: 0.4, cursor: 'pointer', color: col.text, background: col.stroke + '30', border: 'none', WebkitAppearance: 'none', appearance: 'none' }}
        aria-label="Close">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingRight: '24px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + col.stroke + '40', background: col.fill, color: col.text }}>
          {GROUP_LABELS[concept.group] ?? concept.group}
        </span>
        {concept.courses.map(c => (
          <span key={c} style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid ' + col.dot + '50', borderRadius: '4px', padding: '2px 6px', background: col.dot + '18', color: col.dot }}>
            {c}
          </span>
        ))}
      </div>
      <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px', color: col.text }}>{concept.label}</p>
      <p style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.5, marginBottom: '8px', color: col.text }}>
        {cards.length} card{cards.length !== 1 ? 's' : ''}
      </p>
      {cards.length > 0 && <FlashCardViewer cards={cards} color={col} />}
    </div>
  );
}

function StatsBar({ onFocusNode, selectedId }: {
  onFocusNode: (id: string) => void;
  selectedId: string | null;
}) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [hoveredNode,   setHoveredNode]   = useState<string | null>(null);
  // Sort by card count descending; derived, never hardcoded
  const order    = Object.keys(GROUP_STATS).sort((a, b) => GROUP_STATS[b].cards - GROUP_STATS[a].cards);
  const maxCards = Math.max(...order.map(g => GROUP_STATS[g].cards));

  return (
    <div style={{ width: '100%', paddingTop: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4px', marginBottom: '12px' }}>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(14,165,233,0.5)' }}>
          Flashcard distribution · {TOTAL_CARDS} total
        </span>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(14,165,233,0.35)' }}>
          expand to navigate concepts
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {order.map((grp, idx) => {
          const col      = GROUP_COLORS[grp];
          const stat     = GROUP_STATS[grp];
          const pct      = (stat.cards / TOTAL_CARDS) * 100;
          const barPct   = (stat.cards / maxCards) * 100;
          const isOpen   = expandedGroup === grp;
          const concepts = ALL_CONCEPTS.filter(c => c.group === grp)
            .sort((a, b) => (ALL_CARDS[b.id]?.length ?? 0) - (ALL_CARDS[a.id]?.length ?? 0));
          return (
            <div key={grp}>
              {idx > 0 && <div style={{ borderTop: '1px solid rgba(14,165,233,0.12)', marginBottom: '16px' }} />}
              <button onClick={() => setExpandedGroup(isOpen ? null : grp)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: 0, background: 'none', border: 'none', padding: 0, WebkitAppearance: 'none', appearance: 'none', outline: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, width: '30%', minWidth: 0 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: col.dot }} />
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: col.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {GROUP_LABELS[grp]}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0, height: '16px', borderRadius: '2px', position: 'relative', background: col.fill + '60' }}>
                  <div style={{ height: '100%', borderRadius: '2px', width: barPct + '%', background: col.dot, opacity: 0.8, transition: 'width 0.5s' }} />
                  <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, color: col.text, mixBlendMode: 'screen' }}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: col.dot }}>{stat.cards}</span>
                  <span className="hidden sm:inline" style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(14,165,233,0.3)' }}>cards</span>
                  <span className="hidden sm:inline" style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(14,165,233,0.15)', margin: '0 2px' }}>·</span>
                  <span className="hidden sm:inline" style={{ fontSize: '9px', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', color: 'rgba(14,165,233,0.38)' }}>{stat.concepts}</span>
                  <span className="hidden sm:inline" style={{ fontSize: '8px', fontFamily: 'monospace', color: 'rgba(14,165,233,0.22)' }}>nodes</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: '4px', flexShrink: 0, color: col.dot, opacity: 0.6, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div style={{ marginTop: '6px', marginLeft: '16px', paddingLeft: '12px', borderLeft: '2px solid ' + col.dot + '40', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {concepts.map(c => {
                    const cardCount = ALL_CARDS[c.id]?.length ?? 0;
                    const isSel = selectedId === c.id;
                    const isHov = hoveredNode === c.id;
                    const active = isSel || isHov;
                    return (
                      <button key={c.id}
                        onClick={() => onFocusNode(c.id)}
                        onMouseEnter={() => setHoveredNode(c.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', minWidth: 0, width: '100%', background: active ? col.dot + (isSel ? '25' : '15') : 'none', opacity: active ? 1 : 0.7, border: 'none', WebkitAppearance: 'none', appearance: 'none', outline: 'none', boxSizing: 'border-box' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: active ? col.dot : col.dot + '60', transform: isHov ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.15s' }} />
                        <span style={{ fontSize: '10px', fontFamily: 'monospace', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: active ? col.text : col.text + '90', fontWeight: active ? 700 : 500 }}>
                          {c.label}
                        </span>
                        <span style={{ fontSize: '8px', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', flexShrink: 0, color: col.dot + '70' }}>{cardCount}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KnowledgeMap() {
  const [selected,     setSelected]     = useState<string | null>(null);
  const [hovered,      setHovered]      = useState<string | null>(null);
  const [mousePos,     setMousePos]     = useState({ x: 0, y: 0 });
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set(Object.keys(GROUP_LABELS)));
  const [search,       setSearch]       = useState('');
  // Multi-touch tracking refs for pinch-to-zoom
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartRef     = useRef<{ dist: number; zoom: number; cx: number; cy: number } | null>(null);
  const [zoom,         setZoom]         = useState(1.0);
  const [pan,          setPan]          = useState({ x: 0, y: 0 });
  const [dragging,     setDragging]     = useState(false);
  const [panning,      setPanning]      = useState(false);
  const [settled,      setSettled]      = useState(false);
  const [fullscreen,   setFullscreen]   = useState(false);
  const [positions,    setPositions]    = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(ALL_CONCEPTS.map(c => [c.id, { x: c.x, y: c.y }]))
  );

  const physRef     = useRef<PhysNode[]>(ALL_CONCEPTS.map(c => ({ id: c.id, x: c.x, y: c.y, vx: 0, vy: 0 })));
  const dragRef     = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panStartRef = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const panRef      = useRef({ x: 0, y: 0 });
  const zoomRef     = useRef(1.0);
  const svgRef      = useRef<SVGSVGElement>(null);
  const graphRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const settledRef  = useRef(false);
  const nodeIdxMap  = useRef(new Map(physRef.current.map((n, i) => [n.id, i])));
  const graphFocusedRef = useRef(false);
  const selectedRef     = useRef<string | null>(null);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nodeId = params.get('node');
    if (nodeId && ALL_CONCEPTS.find(c => c.id === nodeId)) {
      setTimeout(() => focusNode(nodeId), 600);
    }
  }, []);

  const visibleConcepts = ALL_CONCEPTS.filter(c => activeGroups.has(c.group));
  const visibleIds      = new Set(visibleConcepts.map(c => c.id));

  const searchLower = search.toLowerCase().trim();
  const matchedIds  = searchLower
    ? new Set(ALL_CONCEPTS.filter(c => c.label.toLowerCase().includes(searchLower) || c.id.includes(searchLower)).map(c => c.id))
    : null;

  useEffect(() => {
    settledRef.current = false;
    setSettled(false);
    const ns       = physRef.current;
    const nodeIdx  = nodeIdxMap.current;
    const visEdges = ALL_EDGES.filter(e => visibleIds.has(e.from) && visibleIds.has(e.to));

    ns.forEach(n => {
      if (!visibleIds.has(n.id)) return;
      const grp    = ALL_CONCEPTS.find(c => c.id === n.id)?.group;
      const anchor = grp ? GROUP_ANCHORS[grp] : { x: W / 2, y: H / 2 };
      if (anchor) { n.x = anchor.x + (n.x - W / 2) * 0.15; n.y = anchor.y + (n.y - H / 2) * 0.15; n.vx = 0; n.vy = 0; }
    });

    const runStep = () => {
      const forces  = ns.map(() => ({ fx: 0, fy: 0 }));
      const visArr  = ns.filter(n => visibleIds.has(n.id));
      for (let i = 0; i < visArr.length; i++) {
        for (let j = i + 1; j < visArr.length; j++) {
          const dx = (visArr[j].x - visArr[i].x) || 0.01, dy = (visArr[j].y - visArr[i].y) || 0.01;
          const d2 = dx * dx + dy * dy, d = Math.sqrt(d2) || 1, f = REPULSION / d2;
          const fi = nodeIdx.get(visArr[i].id)!, fj = nodeIdx.get(visArr[j].id)!;
          forces[fi].fx -= (dx / d) * f; forces[fi].fy -= (dy / d) * f;
          forces[fj].fx += (dx / d) * f; forces[fj].fy += (dy / d) * f;
        }
      }
      for (const e of visEdges) {
        const fi = nodeIdx.get(e.from), ti = nodeIdx.get(e.to);
        if (fi === undefined || ti === undefined) continue;
        const fromGrp = ALL_CONCEPTS.find(c => c.id === e.from)?.group;
        const toGrp   = ALL_CONCEPTS.find(c => c.id === e.to)?.group;
        const springLen = fromGrp === toGrp ? SPRING_LEN_INTRA : SPRING_LEN_INTER;
        const dx = ns[ti].x - ns[fi].x, dy = ns[ti].y - ns[fi].y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1, f = SPRING_K * (d - springLen);
        forces[fi].fx += (dx / d) * f; forces[fi].fy += (dy / d) * f;
        forces[ti].fx -= (dx / d) * f; forces[ti].fy -= (dy / d) * f;
      }
      for (let i = 0; i < ns.length; i++) {
        if (!visibleIds.has(ns[i].id)) continue;
        const grp    = ALL_CONCEPTS.find(c => c.id === ns[i].id)?.group;
        const anchor = grp ? GROUP_ANCHORS[grp] : { x: W / 2, y: H / 2 };
        if (anchor) { forces[i].fx += (anchor.x - ns[i].x) * ANCHOR_K; forces[i].fy += (anchor.y - ns[i].y) * ANCHOR_K; }
      }
      let totalEnergy = 0;
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        if (!visibleIds.has(n.id)) continue;
        n.vx = (n.vx + forces[i].fx) * DAMPING; n.vy = (n.vy + forces[i].fy) * DAMPING;
        if (n.x < BOUND_PAD)     n.vx += BOUND_K * (BOUND_PAD - n.x);
        if (n.x > W - BOUND_PAD) n.vx += BOUND_K * (W - BOUND_PAD - n.x);
        if (n.y < BOUND_PAD)     n.vy += BOUND_K * (BOUND_PAD - n.y);
        if (n.y > H - BOUND_PAD) n.vy += BOUND_K * (H - BOUND_PAD - n.y);
        n.x += n.vx; n.y += n.vy;
        totalEnergy += Math.abs(n.vx) + Math.abs(n.vy);
      }
      return totalEnergy / Math.max(ns.filter(n => visibleIds.has(n.id)).length, 1);
    };

    for (let i = 0; i < 150; i++) { if (runStep() < ENERGY_THRESHOLD) break; }
    setPositions(Object.fromEntries(ns.map(n => [n.id, { x: n.x, y: n.y }])));

    const tick = () => {
      if (settledRef.current) return;
      const energy = runStep();
      setPositions(Object.fromEntries(ns.map(n => [n.id, { x: n.x, y: n.y }])));
      if (energy < ENERGY_THRESHOLD) { settledRef.current = true; setSettled(true); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeGroups]);

  const restartSim = useCallback(() => { settledRef.current = false; setSettled(false); cancelAnimationFrame(rafRef.current); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (selected) setSelected(null); else setFullscreen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  useEffect(() => {
    const keys = new Set<string>();
    const PAN_SPEED = 8;
    let raf = 0;
    const loop = () => {
      let dx = 0, dy = 0;
      if (keys.has('a') || keys.has('ArrowLeft'))  dx =  PAN_SPEED;
      if (keys.has('d') || keys.has('ArrowRight')) dx = -PAN_SPEED;
      if (keys.has('w') || keys.has('ArrowUp'))    dy =  PAN_SPEED;
      if (keys.has('s') || keys.has('ArrowDown'))  dy = -PAN_SPEED;
      if (dx !== 0 || dy !== 0) {
        const clamped = { x: Math.max(-PAN_LIMIT * zoomRef.current, Math.min(PAN_LIMIT * zoomRef.current, panRef.current.x + dx)), y: Math.max(-PAN_LIMIT * zoomRef.current, Math.min(PAN_LIMIT * zoomRef.current, panRef.current.y + dy)) };
        panRef.current = clamped; setPan({ ...clamped });
      }
      raf = requestAnimationFrame(loop);
    };
    const onDown = (e: KeyboardEvent) => {
      if (!graphFocusedRef.current) return;
      if (selectedRef.current) return;
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (['w','a','s','d','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); keys.add(e.key); if (raf === 0) raf = requestAnimationFrame(loop); }
    };
    const onUp = (e: KeyboardEvent) => { keys.delete(e.key); if (keys.size === 0) { cancelAnimationFrame(raf); raf = 0; } };
    const onDocClick = (e: MouseEvent) => {
      const graph = graphRef.current;
      if (graph && !graph.contains(e.target as Node)) { graphFocusedRef.current = false; keys.clear(); cancelAnimationFrame(raf); raf = 0; }
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    document.addEventListener('click', onDocClick, true);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); document.removeEventListener('click', onDocClick, true); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (fullscreen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); e.stopPropagation();
      const svg = svgRef.current; if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const svgScale = W / rect.width;
      if (e.ctrlKey) {
        const rawDelta = Math.max(-30, Math.min(30, e.deltaY));
        const factor   = 1 - rawDelta * 0.022;
        const oldZoom  = zoomRef.current;
        const newZoom  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, oldZoom * factor));
        const lx = (e.clientX - rect.left) * svgScale;
        const ly = (e.clientY - rect.top)  * (H / rect.height);
        const wx = (lx - W / 2 - panRef.current.x) / oldZoom;
        const wy = (ly - H / 2 - panRef.current.y) / oldZoom;
        const np = clampPan(lx - W / 2 - wx * newZoom, ly - H / 2 - wy * newZoom);
        zoomRef.current = newZoom; panRef.current = np; setZoom(newZoom); setPan(np);
      } else {
        const dx = -e.deltaX * svgScale, dy = -e.deltaY * svgScale;
        const clamped = clampPan(panRef.current.x + dx, panRef.current.y + dy);
        panRef.current = clamped; setPan(clamped);
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [fullscreen]);

  const toWorld = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current; if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const lx = (clientX - rect.left) * (W / rect.width);
    const ly = (clientY - rect.top)  * (H / rect.height);
    const z = zoomRef.current, px = panRef.current.x, py = panRef.current.y;
    return { x: (lx - (W / 2 + px)) / z + W / 2, y: (ly - (H / 2 + py)) / z + H / 2 };
  }, []);

  const clampPan = (x: number, y: number) => {
    const limit = PAN_LIMIT * zoomRef.current;
    return { x: Math.max(-limit, Math.min(limit, x)), y: Math.max(-limit, Math.min(limit, y)) };
  };

  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const w = toWorld(e.clientX, e.clientY);
    const n = physRef.current.find(n => n.id === id)!;
    dragRef.current = { id, ox: w.x - n.x, oy: w.y - n.y };
    setDragging(true); restartSim();
  };

  const onSvgPointerDown = (e: React.PointerEvent) => {
    graphFocusedRef.current = true;
    if (dragRef.current) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointersRef.current.size >= 2) {
      // Two fingers down: start pinch, cancel pan
      const pts  = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      pinchStartRef.current = { dist, zoom: zoomRef.current, cx: (pts[0].x + pts[1].x) / 2, cy: (pts[0].y + pts[1].y) / 2 };
      panStartRef.current = null;
      setPanning(false);
    } else {
      // Single finger: pan
      pinchStartRef.current = null;
      panStartRef.current = { mx: e.clientX, my: e.clientY, px: panRef.current.x, py: panRef.current.y };
      setPanning(true);
    }
  };

  const onSvgPointerMove = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (svg) { const rect = svg.getBoundingClientRect(); setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top }); }
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (dragRef.current) {
      const w = toWorld(e.clientX, e.clientY);
      const n = physRef.current.find(n => n.id === dragRef.current!.id)!;
      n.x = w.x - dragRef.current.ox; n.y = w.y - dragRef.current.oy; n.vx = 0; n.vy = 0;
    } else if (activePointersRef.current.size >= 2 && pinchStartRef.current) {
      const pts     = Array.from(activePointersRef.current.values());
      const dist    = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      const midX    = (pts[0].x + pts[1].x) / 2;
      const midY    = (pts[0].y + pts[1].y) / 2;
      const factor  = dist / pinchStartRef.current.dist;
      const newZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, pinchStartRef.current.zoom * factor));
      const svgEl   = svgRef.current; if (!svgEl) return;
      const rect    = svgEl.getBoundingClientRect();
      const lx      = (midX - rect.left) * (W / rect.width);
      const ly      = (midY - rect.top)  * (H / rect.height);
      const oldZoom = zoomRef.current;
      const wx = (lx - W / 2 - panRef.current.x) / oldZoom;
      const wy = (ly - H / 2 - panRef.current.y) / oldZoom;
      const np = clampPan(lx - W / 2 - wx * newZoom, ly - H / 2 - wy * newZoom);
      zoomRef.current = newZoom; panRef.current = np; setZoom(newZoom); setPan(np);
    } else if (panStartRef.current) {
      const svgEl = svgRef.current; if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect(), scaleX = W / rect.width;
      const dx = (e.clientX - panStartRef.current.mx) * scaleX;
      const dy = (e.clientY - panStartRef.current.my) * scaleX;
      const clamped = clampPan(panStartRef.current.px + dx, panStartRef.current.py + dy);
      panRef.current = clamped; setPan(clamped);
    }
  };

  const onSvgPointerUp = (e: React.PointerEvent) => {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) pinchStartRef.current = null;
    if (activePointersRef.current.size === 0) { dragRef.current = null; panStartRef.current = null; setDragging(false); setPanning(false); }
  };

  const onSvgPointerLeave = () => {
    activePointersRef.current.clear(); pinchStartRef.current = null;
    dragRef.current = null; panStartRef.current = null;
    setDragging(false); setPanning(false);
  };

  const activeId  = hovered ?? selected;
  const connected = activeId ? (() => {
    const s = new Set<string>();
    ALL_EDGES.forEach(e => { if (e.from === activeId) s.add(e.to); if (e.to === activeId) s.add(e.from); });
    return s;
  })() : new Set<string>();

  const nodeOpacity = (id: string) => {
    if (matchedIds && !matchedIds.has(id)) return 0.06;
    if (!activeId) return 1;
    if (id === activeId || connected.has(id)) return 1;
    return 0.1;
  };

  const doFit     = () => { zoomRef.current = 1.0; panRef.current = { x: 0, y: 0 }; setZoom(1.0); setPan({ x: 0, y: 0 }); };
  const doSetZoom = (fn: (z: number) => number) => { const nz = fn(zoomRef.current); zoomRef.current = nz; setZoom(nz); };

  const focusNode = useCallback((id: string) => {
    const node = physRef.current.find(n => n.id === id);
    if (!node) return;
    graphRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      const z = zoomRef.current;
      const np = { x: (W / 2 - node.x) * z, y: (H / 2 - node.y) * z };
      panRef.current = np; setPan(np); setSelected(id);
    }, 300);
  }, []);

  const toggleGroup = (g: string) => {
    setActiveGroups(prev => { const next = new Set(prev); if (next.has(g)) { if (next.size > 1) next.delete(g); } else next.add(g); return next; });
    setSelected(null);
  };

  const allGroupKeys    = Object.keys(GROUP_LABELS);
  const allActive       = activeGroups.size === allGroupKeys.length;
  const zT              = `translate(${W / 2 + pan.x},${H / 2 + pan.y}) scale(${zoom}) translate(${-W / 2},${-H / 2})`;
  const selectedConcept = ALL_CONCEPTS.find(c => c.id === selected) ?? null;
  const btnBase = "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-all duration-150 border border-sky-200 dark:border-sky-700 bg-white/80 dark:bg-sky-900/80 backdrop-blur-sm text-sky-700 dark:text-sky-300 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-white dark:hover:bg-sky-800 shadow-sm select-none";

  const renderStarMap = (blobId: string) => (
    <>
      <defs>
        <filter id={blobId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="blur" />
        </filter>
      </defs>
      <g style={{ pointerEvents: 'none' }}>
        {BG_STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op} />)}
      </g>
      <g transform={zT}>
        {Object.entries(GROUP_COLORS).map(([grp, col]) => {
          if (!activeGroups.has(grp)) return null;
          const grpNodes = visibleConcepts.filter(c => c.group === grp);
          return (
            <g key={'blob-' + grp} filter={'url(#' + blobId + ')'} opacity="0.18" style={{ pointerEvents: 'none' }}>
              {grpNodes.map(c => { const pos = positions[c.id] ?? { x: c.x, y: c.y }; return <circle key={c.id} cx={pos.x} cy={pos.y} r="32" fill={col.dot} />; })}
            </g>
          );
        })}
        {Object.entries(GROUP_LABELS).map(([grp, label]) => {
          if (!activeGroups.has(grp)) return null;
          const grpNodes = visibleConcepts.filter(c => c.group === grp);
          if (!grpNodes.length) return null;
          const col    = GROUP_COLORS[grp];
          const anchor = GROUP_ANCHORS[grp];
          const topY   = Math.min(...grpNodes.map(c => (positions[c.id]?.y ?? c.y)));
          const lblX   = anchor.x;
          const lblY   = topY - 22 + (LABEL_Y_OFFSET[grp] ?? 0);
          return (
            <g key={'lbl-' + grp} style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <text x={lblX} y={lblY} textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="800" letterSpacing="0.2em" fill={col.dot} opacity="0.7">
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}
        {ALL_EDGES.map((e, i) => {
          if (!visibleIds.has(e.from) || !visibleIds.has(e.to)) return null;
          const fromGrp = ALL_CONCEPTS.find(c => c.id === e.from)?.group;
          const toGrp   = ALL_CONCEPTS.find(c => c.id === e.to)?.group;
          const isIntra = fromGrp === toGrp;
          const fp = positions[e.from] ?? { x: 0, y: 0 }, tp = positions[e.to] ?? { x: 0, y: 0 };
          const dx = tp.x - fp.x, dy = tp.y - fp.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          const x1 = fp.x + (dx / d) * 6, y1 = fp.y + (dy / d) * 6;
          const x2 = tp.x - (dx / d) * 6, y2 = tp.y - (dy / d) * 6;
          const isOn = !!(activeId && (e.from === activeId || e.to === activeId));
          const fromCol = GROUP_COLORS[fromGrp ?? 'hardware'];
          const op = isOn ? 0.9 : !activeId ? (isIntra ? 0.28 : 0.06) : 0.03;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isOn ? fromCol.dot : isIntra ? fromCol.dot : '#7dd3fc'}
            strokeWidth={isOn ? 1.4 : isIntra ? 0.7 : 0.5} opacity={op}
            strokeDasharray={!isIntra ? '2 5' : undefined}
            style={{ transition: 'opacity 0.25s' }} />;
        })}
        {visibleConcepts.map(c => {
          const pos        = positions[c.id] ?? { x: c.x, y: c.y };
          const col        = GROUP_COLORS[c.group] ?? GROUP_COLORS['hardware'];
          const isAct      = c.id === activeId;
          const isConn     = connected.has(c.id);
          const cardCount  = CARD_COUNT_MAP[c.id] ?? 0;
          const brightness = 0.3 + (cardCount / MAX_CARD_COUNT) * 0.7;
          const baseR      = 3 + Math.round((cardCount / MAX_CARD_COUNT) * 8);
          const r          = isAct ? baseR + 5 : isConn ? baseR + 1 : baseR;
          return (
            <g key={c.id} transform={'translate(' + pos.x + ',' + pos.y + ')'}
              style={{ opacity: nodeOpacity(c.id), cursor: 'pointer' }}
              onMouseEnter={() => { if (!dragRef.current) setHovered(c.id); }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => { if (!dragRef.current) setSelected(prev => prev === c.id ? null : c.id); }}
              onPointerDown={e => onNodePointerDown(e, c.id)}>
              <circle r={r * 3.5} fill={col.dot} opacity={brightness * (isAct ? 0.12 : 0.05)} style={{ pointerEvents: 'none' }} />
              <circle r={r * 1.9} fill={col.dot} opacity={brightness * (isAct ? 0.3  : 0.14)} style={{ pointerEvents: 'none' }} />
              <circle r={r} fill={col.dot} opacity={0.55 + brightness * 0.45}
                style={{ filter: isAct ? ('drop-shadow(0 0 ' + (r + 4) + 'px ' + col.dot + ')') : undefined }} />
              <circle r={Math.max(1.2, r * 0.28)} fill="white" opacity={0.5 + brightness * 0.5} style={{ pointerEvents: 'none' }} />
              {isAct && <>
                <circle r={r + 9}  fill="none" stroke={col.dot} strokeWidth="0.8" opacity="0.35" />
                <circle r={r + 18} fill="none" stroke={col.dot} strokeWidth="0.4" opacity="0.15" />
              </>}
            </g>
          );
        })}
      </g>
    </>
  );

  return (
    <div className="w-full space-y-4 pb-20">

      <div className="relative w-full max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input type="text" placeholder="Search concepts..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-8 py-1.5 text-xs font-mono rounded-lg border border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/50 text-sky-900 dark:text-sky-100 placeholder-sky-400 dark:placeholder-sky-600 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500 transition-colors" />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600 cursor-pointer">
            <svg width="10" height="10" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {allGroupKeys.map(key => {
          const active = activeGroups.has(key);
          const col    = GROUP_COLORS[key];
          return (
            <button key={key} onClick={() => toggleGroup(key)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 border"
              style={{ borderColor: active ? col.stroke + '80' : 'transparent', background: active ? col.fill + 'cc' : 'transparent', color: active ? col.text : '#64748b', opacity: active ? 1 : 0.5 }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: active ? col.dot : '#64748b' }} />
              {GROUP_LABELS[key]}
            </button>
          );
        })}
        <button onClick={() => { setActiveGroups(allActive ? new Set([allGroupKeys[0]]) : new Set(allGroupKeys)); setSelected(null); }}
          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer border border-sky-200 dark:border-sky-800 text-sky-500 dark:text-sky-500 hover:border-sky-400 dark:hover:border-sky-600 transition-all duration-200">
          {allActive ? 'Isolate' : 'All'}
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '32px', rowGap: '4px', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(14,165,233,0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="8" viewBox="0 0 22 8"><line x1="1" y1="4" x2="21" y2="4" stroke="#38bdf8" strokeWidth="0.9" /></svg>
          within group
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="8" viewBox="0 0 22 8"><line x1="1" y1="4" x2="21" y2="4" stroke="#7dd3fc" strokeWidth="0.6" strokeDasharray="2 5" /></svg>
          cross group
        </div>
      </div>

      {!fullscreen && (
        <div ref={graphRef} className="relative w-full rounded-2xl border border-sky-900/40 overflow-hidden" style={{ background: '#020818' }}>
          <div className="absolute top-3 right-3 z-10 hidden md:flex flex-col gap-1">
            <button onClick={() => doSetZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} className={btnBase}>+</button>
            <button onClick={doFit} className={btnBase} style={{ fontSize: '9px', letterSpacing: '0.05em' }}>FIT</button>
            <button onClick={() => doSetZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} className={btnBase}>-</button>
            <button onClick={() => setFullscreen(true)} className={btnBase} title="Enter fullscreen" style={{ marginTop: '4px' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 4V1h3M7 1h3v3M10 7v3H7M4 10H1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="text-center font-mono mt-0.5" style={{ fontSize: '8px', color: 'rgb(14 165 233 / 0.5)' }}>{Math.round(zoom * 100)}%</div>
          </div>
          {!settled && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 font-mono pointer-events-none" style={{ fontSize: "9px", color: "rgb(14 165 233 / 0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
              mapping...
            </div>
          )}
          <svg ref={svgRef} viewBox={'0 0 ' + W + ' ' + H} className="w-full h-auto block"
            style={{ cursor: dragging || panning ? 'grabbing' : 'grab', touchAction: 'none' }}
            onPointerDown={onSvgPointerDown} onPointerMove={onSvgPointerMove}
            onPointerUp={onSvgPointerUp} onPointerLeave={onSvgPointerLeave}>
            {renderStarMap('km-blob')}
          </svg>
          {selectedConcept && (
            <div className="absolute bottom-4 right-4 w-72 hidden md:block" style={{ maxHeight: '85%', overflowY: 'auto' }}>
              <DetailPanel concept={selectedConcept} onClose={() => setSelected(null)} />
            </div>
          )}
          {!selectedConcept && (
            <div className="absolute bottom-3 left-4 font-mono pointer-events-none select-none hidden md:block" style={{ fontSize: '9px', color: 'rgb(14 165 233 / 0.25)' }}>
              pinch to zoom · two-finger scroll to pan · click a star to open cards · esc to close
            </div>
          )}
          {hovered && (() => {
            const concept = ALL_CONCEPTS.find(c => c.id === hovered);
            if (!concept) return null;
            const col = GROUP_COLORS[concept.group] ?? GROUP_COLORS['hardware'];
            const cardCount = ALL_CARDS[concept.id]?.length ?? 0;
            return (
              <div className="absolute pointer-events-none z-20 select-none"
                style={{ left: mousePos.x + 14, top: mousePos.y - 10, transform: 'translateY(-100%)' }}>
                <div className="rounded-lg px-2.5 py-1.5 text-[11px] font-mono font-semibold shadow-lg"
                  style={{ background: '#0a0f1e', border: '1px solid ' + col.dot + '60', color: col.dot, maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {concept.label}
                  <span className="ml-2 text-[9px] opacity-50">{cardCount} cards</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <div className="md:hidden flex items-center justify-center gap-2 pt-1">
        <button onClick={() => doSetZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} className={btnBase}>+</button>
        <button onClick={doFit} className={btnBase + ' px-3'} style={{ width: 'auto', fontSize: '9px' }}>FIT</button>
        <button onClick={() => doSetZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} className={btnBase}>-</button>
        <span className="font-mono ml-1" style={{ fontSize: '9px', color: 'rgb(14 165 233 / 0.5)' }}>{Math.round(zoom * 100)}%</span>
      </div>
      {selectedConcept && <div className="md:hidden mt-1"><DetailPanel concept={selectedConcept} onClose={() => setSelected(null)} /></div>}
      {!selectedConcept && (
        <div className="md:hidden font-mono select-none text-center pt-1" style={{ fontSize: "9px", color: "rgb(14 165 233 / 0.25)" }}>
          <div>tap a node to open cards</div>
          <div>pinch or use buttons to zoom</div>
        </div>
      )}

      <div className="border-t border-sky-100 dark:border-sky-900 pt-4">
        <StatsBar onFocusNode={focusNode} selectedId={selected} />
      </div>

      {fullscreen && typeof document !== 'undefined' && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#020818', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 100000, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button onClick={() => doSetZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} className={btnBase}>+</button>
            <button onClick={doFit} className={btnBase} style={{ fontSize: '9px', letterSpacing: '0.05em' }}>FIT</button>
            <button onClick={() => doSetZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} className={btnBase}>-</button>
            <div style={{ textAlign: 'center', fontSize: '8px', fontFamily: 'monospace', color: '#64748b', marginTop: '2px' }}>{Math.round(zoom * 100)}%</div>
            <button onClick={() => setFullscreen(false)} className={btnBase} title="Exit fullscreen (Esc)" style={{ marginTop: '8px' }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M4 1H1v3M1 7v3h3M7 10h3V7M10 4V1H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '9px', fontFamily: 'monospace', color: '#1e3a5f', pointerEvents: 'none', userSelect: 'none', zIndex: 100000 }}>
            pinch to zoom · two-finger scroll to pan · click a star to open cards · esc to exit
          </div>
          <svg ref={svgRef} viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: '100%', display: 'block', cursor: dragging || panning ? 'grabbing' : 'grab', touchAction: 'none' }}
            onPointerDown={onSvgPointerDown} onPointerMove={onSvgPointerMove}
            onPointerUp={onSvgPointerUp} onPointerLeave={onSvgPointerLeave}>
            {renderStarMap('km-blob-fs')}
          </svg>
          {selectedConcept && (
            <div style={{ position: 'absolute', bottom: '16px', right: '80px', width: '288px', maxHeight: '85%', overflowY: 'auto', zIndex: 100000 }}>
              <DetailPanel concept={selectedConcept} onClose={() => setSelected(null)} />
            </div>
          )}
          {hovered && (() => {
            const concept   = ALL_CONCEPTS.find(c => c.id === hovered);
            if (!concept) return null;
            const col       = GROUP_COLORS[concept.group] ?? GROUP_COLORS['hardware'];
            const cardCount = ALL_CARDS[concept.id]?.length ?? 0;
            return (
              <div style={{ position: 'absolute', left: mousePos.x + 14, top: mousePos.y - 10, transform: 'translateY(-100%)', pointerEvents: 'none', zIndex: 100001 }}>
                <div style={{ background: '#0a0f1e', border: '1px solid ' + col.dot + '60', color: col.dot, borderRadius: '8px', padding: '6px 10px', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxShadow: '0 4px 20px #00000080' }}>
                  {concept.label}
                  <span style={{ marginLeft: '8px', fontSize: '9px', opacity: 0.5 }}>{cardCount} cards</span>
                </div>
              </div>
            );
          })()}
        </div>,
        document.body
      )}

    </div>
  );
}