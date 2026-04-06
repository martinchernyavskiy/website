import React from 'react';
import { 
  SiCplusplus, SiPython, SiPostgresql, SiGnubash, 
  SiApachespark, SiApachekafka, SiApachecassandra, SiApachehadoop,
  SiLinux, SiDocker, SiGit, SiNvidia, SiApache, SiCmake, SiGoogle
} from 'react-icons/si';
import { 
  TbApi, TbSettingsAutomation, TbTargetArrow, TbDatabaseSearch, 
  TbHierarchy, TbBolt, TbShieldCheck, TbActivity, TbTestPipe, TbInfinity, TbServer
} from 'react-icons/tb';

const SkillGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400/60 uppercase tracking-widest">{title}</span>
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  </div>
);

const IconBadge = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border bg-white dark:bg-sky-900/10 border-sky-200 dark:border-sky-800/50 transition-all duration-300 group hover:border-sky-400 hover:bg-white dark:hover:bg-sky-800/30 shadow-sm">
    <Icon className="text-sky-600 dark:text-sky-400 text-xs group-hover:scale-110 transition-transform" />
    <span className="text-[10px] font-mono font-bold text-sky-800 dark:text-sky-200">{label}</span>
  </div>
);

export default function TechStack() {
  return (
    <div className="grid gap-6">
      <SkillGroup title="Systems & Performance">
        <IconBadge icon={SiCplusplus} label="C++" />
        <IconBadge icon={SiNvidia} label="CUDA/RAPIDS" />
        <IconBadge icon={TbSettingsAutomation} label="SIMD/AVX-512" />
        <IconBadge icon={TbShieldCheck} label="RAII" />
        <IconBadge icon={SiLinux} label="Linux Internals" />
        <IconBadge icon={TbActivity} label="perf" />
        <IconBadge icon={TbTargetArrow} label="Nsight Systems" />
        <IconBadge icon={SiCmake} label="CMake" />
      </SkillGroup>

      <SkillGroup title="Data Systems & Storage">
        <IconBadge icon={TbBolt} label="Vectorized Execution" />
        <IconBadge icon={SiApache} label="Apache Arrow" />
        <IconBadge icon={TbDatabaseSearch} label="Query Optimization" />
        <IconBadge icon={TbServer} label="Buffer Pool Mgmt" />
        <IconBadge icon={TbHierarchy} label="B+ Trees" />
        <IconBadge icon={TbHierarchy} label="LSM Trees" />
        <IconBadge icon={SiPostgresql} label="SQL" />
      </SkillGroup>

      <SkillGroup title="Distributed Systems">
        <IconBadge icon={SiApachespark} label="Apache Spark" />
        <IconBadge icon={SiApachekafka} label="Kafka" />
        <IconBadge icon={SiApachecassandra} label="Cassandra" />
        <IconBadge icon={SiApachehadoop} label="HDFS" />
        <IconBadge icon={TbApi} label="gRPC" />
        <IconBadge icon={SiGoogle} label="Protobuf" />
      </SkillGroup>

      <SkillGroup title="Backend & Tooling">
        <IconBadge icon={SiPython} label="Python" />
        <IconBadge icon={TbTestPipe} label="GTest" />
        <IconBadge icon={SiDocker} label="Docker" />
        <IconBadge icon={TbInfinity} label="CI/CD" />
        <IconBadge icon={SiGnubash} label="Bash" />
        <IconBadge icon={SiGit} label="Git" />
      </SkillGroup>
    </div>
  );
}