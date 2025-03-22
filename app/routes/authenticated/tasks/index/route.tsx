import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import type { Route } from './+types/route'
import { DataTable } from './components/data-table'
import { columns, parseQueryParams } from './config'
import { getFacetedCounts, listFilteredTasks } from './queries.server'

export const loader = ({ request }: Route.LoaderArgs) => {
  const { search, filters, page, perPage, sortBy, sortOrder } =
    parseQueryParams(request)

  // listFilteredTasks is a server-side function that fetch tasks from the database
  const { data: tasks, pagination } = listFilteredTasks({
    search,
    filters,
    page,
    perPage,
    sortBy,
    sortOrder,
  })

  // getFacetedCounts is a server-side function that fetches the counts of each filter
  const facetedCounts = getFacetedCounts({
    facets: ['status', 'priority'],
    search,
    filters,
  })

  return {
    tasks,
    pagination,
    facetedCounts,
  }
}

export default function Tasks({
  loaderData: { tasks, pagination, facetedCounts },
}: Route.ComponentProps) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="space-x-1" asChild>
            <Link to="/tasks/import">
              <span>Import</span> <IconDownload size={18} />
            </Link>
          </Button>
          <Button className="space-x-1" asChild>
            <Link to="/tasks/create">
              <span>Create</span> <IconPlus size={18} />
            </Link>
          </Button>
        </div>
      </div>

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <DataTable
          data={tasks}
          columns={columns}
          pagination={pagination}
          facetedCounts={facetedCounts}
        />
      </div>
    </div>
  )
}
