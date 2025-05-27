import './Post.scss'
import type { Commonprops } from '@/components/types'
import cn from 'classnames'
import { Container, TextArea, Dropdown } from '@/components'
import { useState, type ReactNode } from 'react'

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

type IconMapProps = {
  label?: string
  key?: string
  icon?: ReactNode
  class?: string
}[]

export const Post = () => {
  const iconMap: IconMapProps = [
    { label: '이미지', class: 'ri-image-fill' },
    { label: '동영상', class: 'ri-movie-fill' },
    { label: '유튜브', class: 'ri-youtube-fill' },
    { label: '코드블록', class: 'ri-text-block' },
    { label: '외부링크', class: 'ri-link-m' },
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

  return (
    <Container className="post-container">
      <PostHeader>
        <div className="category">category</div>
        <TextArea className="title" fullWidth maxLength={60} />

        <IconNav>
          <IconBox className="main-group">
            {iconMap.map((item) => (
              <i tabIndex={0} key={item.label} className={`post-icon icon-label ${item.class}`}>
                <span>{item.label}</span>
              </i>
            ))}
          </IconBox>
          <IconBox className="sub-group">
            <Dropdown slots={textIconMap} />
          </IconBox>
        </IconNav>

        <div className="post-header-nav">header-nav</div>
      </PostHeader>

      <PostBody>
        <div className="write">body</div>
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
