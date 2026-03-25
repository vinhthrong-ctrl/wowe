"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  MoreHorizontal,
  Bookmark,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FeedPost {
  id: string
  type: "photo" | "video" | "highlight"
  user: {
    name: string
    avatar?: string
    level: string
  }
  event: {
    id: string
    title: string
    category: string
  }
  media: string
  caption?: string
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
  isSaved?: boolean
}

const mockFeedPosts: FeedPost[] = [
  {
    id: "1",
    type: "photo",
    user: { name: "Priya S.", level: "Explorer" },
    event: { id: "e1", title: "Sunset Run Club", category: "Run Club" },
    media: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=800&fit=crop",
    caption: "Best way to end the week! 5K done with the most amazing group. Already can't wait for next Sunday!",
    likes: 124,
    comments: 18,
    timestamp: "2h ago",
    isLiked: true,
  },
  {
    id: "2",
    type: "video",
    user: { name: "Arjun P.", level: "Adventurer" },
    event: { id: "e2", title: "Techno Night - Underground", category: "Night Club" },
    media: "https://images.unsplash.com/photo-1571266028243-d220c6a9a6d7?w=600&h=800&fit=crop",
    caption: "The energy was absolutely insane last night. When that bass dropped...",
    likes: 342,
    comments: 45,
    timestamp: "5h ago",
  },
  {
    id: "3",
    type: "photo",
    user: { name: "Sneha R.", level: "Champion" },
    event: { id: "e3", title: "Pottery Workshop", category: "Workshop" },
    media: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop",
    caption: "My first pottery piece! It's wonky but I made it myself and I'm proud of it.",
    likes: 89,
    comments: 12,
    timestamp: "1d ago",
    isSaved: true,
  },
  {
    id: "4",
    type: "highlight",
    user: { name: "WorldWeave", level: "Official" },
    event: { id: "e4", title: "Comedy Night with Biswa", category: "Comedy" },
    media: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=800&fit=crop",
    caption: "What a night! Over 200 people came out for an epic comedy show. Here are the best moments!",
    likes: 567,
    comments: 89,
    timestamp: "2d ago",
  },
]

interface FeedPostCardProps {
  post: FeedPost
}

function FeedPostCard({ post }: FeedPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <Card className="glass overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.user.name}</span>
              <Badge variant="secondary" className="text-[10px] py-0">{post.user.level}</Badge>
            </div>
            <Link 
              href={`/events/${post.event.id}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              at {post.event.title}
            </Link>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Media */}
      <div className="relative aspect-[4/5] bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.media})` }}
        />
        {post.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}
        {post.type === "highlight" && (
          <Badge className="absolute top-3 left-3 bg-primary">
            <Zap className="w-3 h-3 mr-1" />
            Highlight
          </Badge>
        )}
      </div>

      {/* Actions */}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-transform active:scale-90"
            >
              <Heart className={cn(
                "w-6 h-6 transition-colors",
                isLiked && "fill-red-500 text-red-500"
              )} />
              <span className="text-sm font-medium">{likes}</span>
            </button>
            <button className="flex items-center gap-1.5">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button>
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button onClick={() => setIsSaved(!isSaved)}>
            <Bookmark className={cn(
              "w-6 h-6 transition-colors",
              isSaved && "fill-primary text-primary"
            )} />
          </button>
        </div>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.user.name}</span>
            {post.caption}
          </p>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-2">{post.timestamp}</p>
      </CardContent>
    </Card>
  )
}

export function EventFeed({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {mockFeedPosts.map((post) => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Stories/Reels style horizontal scroll
interface StoryItem {
  id: string
  user: string
  avatar?: string
  hasNew: boolean
  eventTitle: string
}

const mockStories: StoryItem[] = [
  { id: "1", user: "Your Story", hasNew: false, eventTitle: "" },
  { id: "2", user: "Priya S.", hasNew: true, eventTitle: "Run Club" },
  { id: "3", user: "Arjun P.", hasNew: true, eventTitle: "Techno Night" },
  { id: "4", user: "Sneha R.", hasNew: true, eventTitle: "Pottery" },
  { id: "5", user: "Vikram K.", hasNew: false, eventTitle: "Comedy" },
  { id: "6", user: "Maya N.", hasNew: true, eventTitle: "Trek" },
]

export function StoriesBar({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4 hide-scrollbar", className)}>
      {mockStories.map((story, index) => (
        <button key={story.id} className="flex flex-col items-center gap-1 shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-full p-0.5",
            story.hasNew 
              ? "bg-gradient-to-tr from-primary via-accent to-primary" 
              : index === 0 
                ? "bg-muted" 
                : "bg-border"
          )}>
            <div className="w-full h-full rounded-full bg-background p-0.5">
              <Avatar className="w-full h-full">
                <AvatarFallback className="text-xs">
                  {index === 0 ? "+" : story.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-xs truncate w-16 text-center">
            {story.user}
          </span>
        </button>
      ))}
    </div>
  )
}
