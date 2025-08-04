import type { Meta, StoryObj } from '@storybook/react';
import Timeline from './Timeline'; // this now includes all subcomponents

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: 'Components/Timeline',
};
export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>August 2025</Timeline.Time>
          <Timeline.Title>Started Project</Timeline.Title>
          <Timeline.Description>
            Built a reusable timeline component using compound component pattern.
          </Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  ),
};
