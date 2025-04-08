# Core UI Components

This directory contains reusable UI components for the Unified Frontend Platform.

## Components

### Button

A versatile button component with various styles and states.

```tsx
import { Button } from "~/core/ui";

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>

// States
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width</Button>
```

### Input

A flexible input component with various styles and states.

```tsx
import { Input } from "~/core/ui";

// Basic usage
<Input placeholder="Enter text" />

// With label
<Input label="Email" placeholder="Enter your email" />

// Variants
<Input variant="outline" placeholder="Outline variant" />
<Input variant="filled" placeholder="Filled variant" />

// Sizes
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />

// With icons
<Input leftIcon={<Icon />} placeholder="With left icon" />
<Input rightIcon={<Icon />} placeholder="With right icon" />

// With error
<Input error="This field is required" placeholder="Error state" />

// With helper text
<Input helperText="This is a helper text" placeholder="With helper text" />
```

### Card

A card component for containing content.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "~/core/ui";

// Basic usage
<Card>
  <CardBody>Card content</CardBody>
</Card>

// With header and footer
<Card>
  <CardHeader>Card Header</CardHeader>
  <CardBody>Card Body</CardBody>
  <CardFooter>Card Footer</CardFooter>
</Card>

// Padding options
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>

// Hoverable card
<Card hoverable>This card has a hover effect</Card>

// Without border
<Card bordered={false}>Card without border</Card>
```

### Toggle

A toggle/switch component for boolean inputs.

```tsx
import { Toggle } from "~/core/ui";

// Basic usage
<Toggle />

// With label
<Toggle label="Enable notifications" />

// Sizes
<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />
<Toggle size="lg" label="Large" />

// Controlled
<Toggle checked={isChecked} onChange={setIsChecked} />

// Disabled
<Toggle disabled label="Disabled toggle" />

// With helper text
<Toggle helperText="This is a helper text" label="With helper text" />
```

### Layout Components

Components for creating layouts.

```tsx
import { Container, Stack, Grid } from "~/core/ui";

// Container
<Container>
  Content with max width
</Container>

<Container size="sm">Small container</Container>
<Container size="md">Medium container</Container>
<Container size="lg">Large container</Container>
<Container size="xl">Extra large container</Container>
<Container size="full">Full width container</Container>

// Stack
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

<Stack direction="row" spacing="md" align="center" justify="between">
  <div>Flex item 1</div>
  <div>Flex item 2</div>
</Stack>

// Grid
<Grid cols={2} gap="md">
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
  <div>Grid item 4</div>
</Grid>

<Grid 
  cols={1} 
  colsMd={2} 
  colsLg={3} 
  colsXl={4} 
  gap="lg"
>
  <div>Responsive grid item 1</div>
  <div>Responsive grid item 2</div>
  <div>Responsive grid item 3</div>
  <div>Responsive grid item 4</div>
</Grid>
```

### Navigation Components

Components for navigation.

```tsx
import { NavBar, SideNav, NavItem } from "~/core/ui";

// NavBar
<NavBar brand={<Logo />}>
  <div>Navigation content</div>
</NavBar>

// Fixed NavBar
<NavBar fixed brand={<Logo />}>
  <div>Fixed navigation content</div>
</NavBar>

// SideNav
<SideNav>
  <NavItem href="/" active>Home</NavItem>
  <NavItem href="/features">Features</NavItem>
  <NavItem href="/settings">Settings</NavItem>
</SideNav>

// Collapsed SideNav
<SideNav collapsed>
  <NavItem href="/" icon={<HomeIcon />} />
  <NavItem href="/features" icon={<FeaturesIcon />} />
  <NavItem href="/settings" icon={<SettingsIcon />} />
</SideNav>

// NavItem
<NavItem href="/" active>Home</NavItem>
<NavItem href="/features" icon={<FeaturesIcon />}>Features</NavItem>
<NavItem href="https://example.com" external>External Link</NavItem>
```

## Usage Guidelines

- Import components directly from the core UI directory:
  ```tsx
  import { Button, Card, Input } from "~/core/ui";
  ```

- Use the TailwindCSS utility classes for additional styling:
  ```tsx
  <Button className="mt-4">Custom Styled Button</Button>
  ```

- All components support dark mode out of the box.

- For accessibility, all interactive components have appropriate ARIA attributes and keyboard navigation support.
