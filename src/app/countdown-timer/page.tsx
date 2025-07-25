'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Maximize2, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'
import { ActionDropdown } from '@/components/layout/action-dropdown'
import { EmptyState } from '@/components/layout/empty-state'
import { 
  Countdown, 
  calculateTimeRemaining, 
  getCountdowns, 
  addCountdown, 
  updateCountdown, 
  deleteCountdown,
  validateFutureDate 
} from '@/lib/countdown'

export default function CountdownTimerPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [editingCountdown, setEditingCountdown] = useState<Countdown | null>(null)
  const [fullscreenCountdown, setFullscreenCountdown] = useState<Countdown | null>(null)
  const [formData, setFormData] = useState({ name: '', targetDate: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    setCountdowns(getCountdowns())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(getCountdowns())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleAddCountdown = () => {
    setError('')
    if (!formData.name.trim()) {
      setError('Please enter a countdown name')
      return
    }
    if (!formData.targetDate) {
      setError('Please select a date and time')
      return
    }
    if (!validateFutureDate(formData.targetDate)) {
      setError('Please select a future date and time')
      return
    }

    try {
      addCountdown({ name: formData.name.trim(), targetDate: formData.targetDate })
      setCountdowns(getCountdowns())
      setFormData({ name: '', targetDate: '' })
      setIsAddDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add countdown')
    }
  }

  const handleEditCountdown = () => {
    if (!editingCountdown) return
    setError('')
    if (!formData.name.trim()) {
      setError('Please enter a countdown name')
      return
    }
    if (!formData.targetDate) {
      setError('Please select a date and time')
      return
    }
    if (!validateFutureDate(formData.targetDate)) {
      setError('Please select a future date and time')
      return
    }

    updateCountdown(editingCountdown.id, { name: formData.name.trim(), targetDate: formData.targetDate })
    setCountdowns(getCountdowns())
    setFormData({ name: '', targetDate: '' })
    setEditingCountdown(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteCountdown = (id: string) => {
    deleteCountdown(id)
    setCountdowns(getCountdowns())
  }

  const openEditDialog = (countdown: Countdown) => {
    setEditingCountdown(countdown)
    setFormData({ name: countdown.name, targetDate: countdown.targetDate })
    setError('')
    setIsEditDialogOpen(true)
  }

  const openFullscreen = (countdown: Countdown) => {
    setFullscreenCountdown(countdown)
    setIsFullscreenOpen(true)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const CountdownDisplay = ({ countdown, isFullscreen = false }: { countdown: Countdown, isFullscreen?: boolean }) => {
    const timeRemaining = calculateTimeRemaining(countdown.targetDate)
    
    if (timeRemaining.isExpired) {
      return (
        <div className={`text-center ${isFullscreen ? 'text-6xl' : 'text-lg'} font-semibold text-destructive`}>
          EXPIRED
        </div>
      )
    }

    if (isFullscreen) {
      // Keep complex display for fullscreen mode
      return (
        <div className="text-center space-y-8">
          <div className="grid grid-cols-4 gap-4 text-6xl font-bold">
            <div className="text-center">
              <div className="text-8xl font-mono">
                {timeRemaining.days.toString().padStart(2, '0')}
              </div>
              <div className="text-xl text-muted-foreground font-normal">
                Days
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl font-mono">
                {timeRemaining.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xl text-muted-foreground font-normal">
                Hours
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl font-mono">
                {timeRemaining.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xl text-muted-foreground font-normal">
                Minutes
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl font-mono">
                {timeRemaining.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xl text-muted-foreground font-normal">
                Seconds
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Simple format for card display
    const parts = []
    if (timeRemaining.days > 0) parts.push(`${timeRemaining.days} days`)
    if (timeRemaining.hours > 0) parts.push(`${timeRemaining.hours} hrs`)
    if (timeRemaining.minutes > 0) parts.push(`${timeRemaining.minutes} min`)
    parts.push(`${timeRemaining.seconds} sec`)

    return (
      <div className="text-lg font-mono text-muted-foreground">
        {parts.join(' | ')}
      </div>
    )
  }

  return (
    <ToolLayout>
      <ToolHeader
        title="Countdown Timers"
        description="Create and manage up to 10 countdown timers for your events and deadlines."
        action={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Add Timer
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Countdown</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Countdown Name</label>
                <Input
                  placeholder="Enter countdown name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Target Date & Time</label>
                <Input
                  type="datetime-local"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                />
              </div>
              {error && (
                <div className="text-sm text-destructive">{error}</div>
              )}
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => {
                    setFormData({ name: '', targetDate: '' })
                    setError('')
                  }}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={handleAddCountdown}>
                  Create Timer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        }
      />

      {countdowns.length === 0 ? (
        <EmptyState
          title="No countdowns yet"
          description="Create your first countdown timer to track important events and deadlines."
          action={
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  Create new countdown timer
                </Button>
              </DialogTrigger>
            </Dialog>
          }
        />
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          <AnimatePresence>
            {countdowns.map((countdown) => (
              <motion.div
                key={countdown.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="w-full">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{countdown.name}</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openFullscreen(countdown)}
                          >
                            Fullscreen
                          </Button>
                          <ActionDropdown>
                            <DropdownMenuItem onClick={() => openEditDialog(countdown)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCountdown(countdown.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </ActionDropdown>
                        </div>
                      </div>
                      <CountdownDisplay countdown={countdown} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Countdown</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Countdown Name</label>
              <Input
                placeholder="Enter countdown name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target Date & Time</label>
              <Input
                type="datetime-local"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              />
            </div>
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button variant="outline" onClick={() => {
                  setFormData({ name: '', targetDate: '' })
                  setEditingCountdown(null)
                  setError('')
                }}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleEditCountdown}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          {fullscreenCountdown && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  {fullscreenCountdown.name}
                </DialogTitle>
                <div className="text-center text-muted-foreground">
                  Target: {formatDateTime(fullscreenCountdown.targetDate)}
                </div>
              </DialogHeader>
              <div className="flex-1 flex items-center justify-center">
                <CountdownDisplay countdown={fullscreenCountdown} isFullscreen />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ToolLayout>
  )
}