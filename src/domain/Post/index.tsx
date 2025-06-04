import './Post.scss'
// import './popover.scss'
import type { Commonprops } from '@/components/types'
import cn from 'classnames'
import { Container, TextArea, Dropdown, Modal, Popover, ToolTip } from '@/components'
import { useState, type ReactNode, type MouseEventHandler } from 'react'
import * as React from 'react'

interface ToolBase {
  icon?: string
  label: string
}

interface ActionTool extends ToolBase {
  type: 'action'
  onClick: () => void
}

interface DropdownTool extends ToolBase {
  type: 'dropdown'
  options: OptionItem[]
}

interface OptionItem {
  label: string
  value: string
  icon?: string
}

type ToolItem = ActionTool | DropdownTool

const tools: ToolItem[] = []

interface IconOptionProps {
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  tooltip?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

interface IconMapItem {
  label?: string
  key?: string
  icon?: ReactNode
  class?: string
  opt?: IconOptionProps
}

type IconMapProps = IconMapItem[]

export const Post = () => {
  const [open, setOpen] = useState(false)
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [openPop, setOpenPop] = useState(false)

  const iconMap: IconMapProps = [
    { label: '이미지', class: 'ri-image-fill', opt: { onClick: () => setOpen(true) } },
    { label: '동영상', class: 'ri-movie-fill' },
    { label: '유튜브', class: 'ri-youtube-fill' },
    { label: '코드블록', class: 'ri-text-block' },
    { label: '외부링크', class: 'ri-link-m', opt: { onClick: () => setOpen(true) } },
  ]
  const textIconMap: IconMapProps = [
    { label: 'table' },
    { label: 'ol' },
    { label: 'ul' },
    { label: 'index4' },
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
  ]
  const maps = [
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
    { label: 'table', icon: <i className="ri-grid-line"></i> },
    { label: 'ol', icon: <i className="ri-list-ordered"></i> },
  ]

  const handleClickPopover = () => {
    if (openPop) {
      return setOpenPop(false)
    }
    setOpenPop(true)
  }

  return (
    <Container className="post-container">
      <PostHeader>
        <div className="category">category</div>
        <TextArea className="title" fullWidth maxLength={60} />

        <button onClick={() => setOpen(true)}>모달 열기</button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h2>제목</h2>
          <p>내용</p>
        </Modal>

        <IconNav>
          <IconBox className="main-group"></IconBox>
          <IconBox className="sub-group">
            <Dropdown slots={textIconMap} />
            {iconMap.map((item) => {
              return (
                <React.Fragment key={item.label}>
                  <i className={`post-icon icon-label ${item.class}`}></i>
                </React.Fragment>
              )
            })}

            <i className="ri-grid-line" onClick={handleClickPopover} style={{ border: '1px solid blue' }}></i>

            <Popover id="img-popover" className="popover">
              <ToolTip desc="팝오버 툴팁">
                <Popover.Button label="" icon={<i className="ri-image-fill"></i>}></Popover.Button>
              </ToolTip>

              <Popover.Content>
                <div style={{ padding: 10, border: '1px solid gray', background: 'white' }}>팝오버 내부 콘텐츠!</div>
              </Popover.Content>
            </Popover>
          </IconBox>
        </IconNav>

        <div className="post-header-nav">header-nav</div>
      </PostHeader>

      <PostBody>
        <div className="write">body</div>

        {/* <article>
          <button type="button" popoverTarget="modal-popover" className="trigger-btn">
            모달 열기
          </button>
          <div id="modal-popover" popover="auto">
            <button type="button" className="close-btn" popoverTarget="modal-popover" popoverTargetAction="toggle">
              <span aria-hidden="true">❌</span>
            </button>
            <p>모달같은 팝오버안에 컨텐츠를 여기다 넣으면 될듯</p>
          </div>
        </article> */}
      </PostBody>

      <PostFooter>footer</PostFooter>
    </Container>
  )
}

const PostHeader = ({ className, children, ...props }: Commonprops) => {
  return (
    <div className={cn('post-header', className)} {...props}>
      {children}
    </div>
  )
}

const PostBody = ({ className, children, ...props }: Commonprops) => {
  return (
    <div className={cn('post-body', className)} {...props}>
      {children}
    </div>
  )
}

const PostFooter = ({ className, children, ...props }: Commonprops) => {
  return (
    <div className={cn('post-footer', className)} {...props}>
      {children}
    </div>
  )
}

const IconBox = ({ className, children, ...props }: Commonprops) => {
  return (
    <div className={cn('icon-box', className)} {...props}>
      {children}
    </div>
  )
}

const IconNav = ({ className, children, ...props }: Commonprops) => {
  return (
    <div className={cn('icon-nav', className)} {...props}>
      {children}
    </div>
  )
}
