import React from 'react';
import { 
  SiCplusplus, SiPython, SiGo, SiPostgresql, SiGnubash, 
  SiApachespark, SiApachekafka, SiApachecassandra, SiApachehadoop,
  SiLinux, SiDocker, SiGit, SiNvidia, SiApache, SiCmake,
  SiPytest, SiGithub, SiGoogle 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { 
  TbApi, TbSettingsAutomation, TbTargetArrow, TbDatabaseSearch, 
  TbHierarchy, TbBolt, TbShieldCheck, TbActivity, TbTestPipe, TbGlobe, TbInfinity
} from 'react-icons/tb';

const SkillGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-mono font-bold text-sky-600/60 dark:text-sky-400/50 uppercase tracking-widest">{title}</span>
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  </div>
);

const IconBadge = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border bg-white/50 dark:bg-sky-900/10 border-sky-100 dark:border-sky-800/50 transition-all duration-300 group hover:border-sky-400 hover:bg-white dark:hover:bg-sky-800/30 shadow-sm">
    <Icon className="text-sky-600 dark:text-sky-400 text-xs group-hover:scale-110 transition-transform" />
    <span className="text-[10px] font-mono font-bold text-sky-800/80 dark:text-sky-200/80">{label}</span>
  </div>
);

export default function TechStack() {
  return (
    <div className="grid gap-6">
      <SkillGroup title="Systems & Performance">
        <IconBadge icon={SiCplusplus} label="C++" />
        <IconBadge icon={SiNvidia} label="CUDA" />
        <IconBadge icon={TbSettingsAutomation} label="SIMD" />
        <IconBadge icon={TbShieldCheck} label="RAII" />
        <IconBadge icon={SiCmake} label="CMake" />
        <IconBadge icon={TbActivity} label="Perf" />
        <IconBadge icon={TbTargetArrow} label="Valgrind" />
      </SkillGroup>

      <SkillGroup title="Data Systems & Storage">
        <IconBadge icon={SiPostgresql} label="SQL" />
        <IconBadge icon={SiApache} label="Apache Arrow" />
        <IconBadge icon={TbBolt} label="Vectorized Execution" />
        <IconBadge icon={TbDatabaseSearch} label="Query Optimization" />
        <IconBadge icon={TbHierarchy} label="B+ Trees" />
        <IconBadge icon={TbHierarchy} label="LSM Trees" />
      </SkillGroup>

      <SkillGroup title="Distributed Systems">
        <IconBadge icon={SiGo} label="Go" />
        <IconBadge icon={TbApi} label="gRPC" />
        <IconBadge icon={SiGoogle} label="Protobuf" />
        <IconBadge icon={SiApachespark} label="Spark" />
        <IconBadge icon={SiApachekafka} label="Kafka" />
        <IconBadge icon={SiApachecassandra} label="Cassandra" />
        <IconBadge icon={SiApachehadoop} label="HDFS" />
      </SkillGroup>

      <SkillGroup title="Backend & Tooling">
        <IconBadge icon={TbGlobe} label="REST" />
        <IconBadge icon={TbTestPipe} label="GTest" />
        <IconBadge icon={SiPytest} label="Pytest" />
        <IconBadge icon={SiPython} label="Python" />
        <IconBadge icon={FaJava} label="Java" />
        <IconBadge icon={SiDocker} label="Docker" />
        <IconBadge icon={TbInfinity} label="CI/CD" />
        <IconBadge icon={SiGit} label="Git" />
        <IconBadge icon={SiGnubash} label="Bash" />
        <IconBadge icon={SiLinux} label="Linux" />
      </SkillGroup>
    </div>
  );
}