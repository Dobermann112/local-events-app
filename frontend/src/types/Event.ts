export type Event = {
  id: string
  title: string
  startAt: string
  endAt: string
  location: string
  capacity: number
  description?: string
  allowSameDay: boolean
  currentJoinedCount: number
  organizerId: string
  participations: {id: string; userId: string}[]
  targetGroups?: {group: string}[]
}