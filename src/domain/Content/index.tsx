import { useState, useRef } from 'react'
import { Container } from '@/components'
import './Content.scss'
import { Popover } from '@/components/Popover/popover2'

export const Content = () => {
  return (
    <Container>
      <Popover targetId="target" popover="manual">
        <Popover.Button>i</Popover.Button>

        <Popover.Content popover="auto">
          <Popover.Button action="hide">x</Popover.Button>
          <p>hi2</p>
          <Popover targetId="innerTarget" popover="auto">
            <Popover.Button> inner </Popover.Button>
            <Popover.Content popover="auto">inner content</Popover.Content>
          </Popover>
        </Popover.Content>
      </Popover>
    </Container>
  )
}
