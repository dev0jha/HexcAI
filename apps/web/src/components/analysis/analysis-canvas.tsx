"use client";

import { useCallback } from "react";

import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { AnalyzedRepo } from "@/types";

interface AnalysisCanvasProps {
  analysisResult: AnalyzedRepo | null;
}

const initialNodes: Node[] = [
  {
    id: "repo",
    position: { x: 250, y: 25 },
    data: { label: "Repository" },
    style: { background: "#e1f5fe", border: "1px solid #01579b" },
  },
  {
    id: "code-quality",
    position: { x: 100, y: 150 },
    data: { label: "Code Quality" },
    style: { background: "#f3e5f5", border: "1px solid #4a148c" },
  },
  {
    id: "architecture",
    position: { x: 250, y: 150 },
    data: { label: "Architecture" },
    style: { background: "#f3e5f5", border: "1px solid #4a148c" },
  },
  {
    id: "security",
    position: { x: 400, y: 150 },
    data: { label: "Security" },
    style: { background: "#f3e5f5", border: "1px solid #4a148c" },
  },
  {
    id: "git-practices",
    position: { x: 175, y: 275 },
    data: { label: "Git Practices" },
    style: { background: "#f3e5f5", border: "1px solid #4a148c" },
  },
  {
    id: "documentation",
    position: { x: 325, y: 275 },
    data: { label: "Documentation" },
    style: { background: "#f3e5f5", border: "1px solid #4a148c" },
  },
  {
    id: "total-score",
    position: { x: 250, y: 400 },
    data: { label: "Total Score" },
    style: { background: "#e8f5e8", border: "1px solid #1b5e20" },
  },
];

const initialEdges: Edge[] = [
  { id: "repo-code-quality", source: "repo", target: "code-quality" },
  { id: "repo-architecture", source: "repo", target: "architecture" },
  { id: "repo-security", source: "repo", target: "security" },
  { id: "code-quality-git", source: "code-quality", target: "git-practices" },
  { id: "architecture-git", source: "architecture", target: "git-practices" },
  { id: "security-git", source: "security", target: "git-practices" },
  { id: "git-total", source: "git-practices", target: "total-score" },
  { id: "code-quality-total", source: "code-quality", target: "total-score" },
  { id: "architecture-total", source: "architecture", target: "total-score" },
  { id: "security-total", source: "security", target: "total-score" },
  { id: "documentation-total", source: "documentation", target: "total-score" },
  { id: "repo-documentation", source: "repo", target: "documentation" },
];

export default function AnalysisCanvas({
  analysisResult,
}: AnalysisCanvasProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updatedNodes = nodes.map((node) => {
    if (node.id === "repo" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `${analysisResult.name}\n${analysisResult.language}\n⭐ ${analysisResult.stars}`,
        },
      };
    }
    if (node.id === "code-quality" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Code Quality\n${analysisResult.scores.codeQuality}/100`,
        },
      };
    }
    if (node.id === "architecture" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Architecture\n${analysisResult.scores.architecture}/100`,
        },
      };
    }
    if (node.id === "security" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Security\n${analysisResult.scores.security}/100`,
        },
      };
    }
    if (node.id === "git-practices" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Git Practices\n${analysisResult.scores.gitPractices}/100`,
        },
      };
    }
    if (node.id === "documentation" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Documentation\n${analysisResult.scores.documentation}/100`,
        },
      };
    }
    if (node.id === "total-score" && analysisResult) {
      return {
        ...node,
        data: {
          ...node.data,
          label: `Total Score\n${analysisResult.totalScore}/100`,
        },
      };
    }
    return node;
  });

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="rounded-3xl border-2 border-dashed text-black"
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
