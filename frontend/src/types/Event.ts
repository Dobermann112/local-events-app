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
  targetGroups?: {group: string}[]
}