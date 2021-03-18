import React, { useEffect, useState } from "react"
import { Divider, Button, ButtonGroup, Fieldset, Spacer } from "@geist-ui/react"
import Characters from "../features/basic"
import Group from "../features/group"
import Expression from "../features/expression"
import Quantifier from "../features/quantifier"
import { getInfoFromNodes, genInitialNodesInfo } from "./helper"
import { GroupKind, NodesInfo, Node } from "@/types"
import { getNodesByIds } from "@/parser/visit"
import { useMainReducer, MainActionTypes } from "@/redux"

export type InsertDirection = "prev" | "next" | "branch"

const InfoItem: React.FC<{}> = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [{ selectedIds, nodes: rootNodes }, dispatch] = useMainReducer()

  useEffect(() => setNodes(getNodesByIds(rootNodes, selectedIds)), [
    rootNodes,
    selectedIds,
  ])

  const oneNode = nodes.length === 1
  const quantifierShow = oneNode

  const [nodesInfo, setNodesInfo] = useState<NodesInfo>(genInitialNodesInfo())

  const { id, expression, group, character } = nodesInfo

  const handleInsert = (direction: InsertDirection) =>
    dispatch({ type: MainActionTypes.INSERT, payload: { direction } })
  const handleGroup = (groupType: string, groupName: string) =>
    dispatch({
      type: MainActionTypes.GROUP,
      payload: { groupType: groupType as GroupKind | "nonGroup", groupName },
    })

  useEffect(() => {
    const nodesInfo = getInfoFromNodes(nodes)
    setNodesInfo(nodesInfo)
  }, [nodes])
  return (
    <>
      <div className="container">
        <Fieldset>
          <Fieldset.Title
            style={{
              paddingTop: "10pt",
              paddingBottom: "10pt",
              paddingLeft: "16pt",
            }}
          >
            Insert A Node
          </Fieldset.Title>
          <Divider y={0} />
          <Fieldset.Content>
            <ButtonGroup>
              <Button onClick={() => handleInsert("prev")}>
                Insert before
              </Button>
              <Button onClick={() => handleInsert("next")}>Insert after</Button>
              <Button onClick={() => handleInsert("branch")}>
                Insert as a branch
              </Button>
            </ButtonGroup>
          </Fieldset.Content>
        </Fieldset>
        <Spacer />
        <Fieldset>
          <Fieldset.Title
            style={{
              paddingTop: "10pt",
              paddingBottom: "10pt",
              paddingLeft: "16pt",
            }}
          >
            Edit Selected Nodes
          </Fieldset.Title>
          <Divider y={0} />
          <Fieldset.Content>
            <Expression expression={expression} />
            {character && <Characters character={character} id={id} />}
            {group && <Group group={group} onGroupChange={handleGroup} />}
            {quantifierShow && <Quantifier />}
          </Fieldset.Content>
        </Fieldset>
      </div>
      <style jsx>{`
        .container {
          margin-top: 12px;
        }

        .button {
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default InfoItem