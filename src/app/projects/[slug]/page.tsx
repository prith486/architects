import type {Metadata} from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import ProjectDetailClient from '@/components/portfolio/ProjectDetailClient';
import { client } from '@/sanity/lib/client';
import { allProjectSlugsQuery, projectBySlugQuery } from '@/sanity/lib/queries';
import {
  mapSanityProjectToProject,
  type MappedProject,
  type SanityProjectDocument,
} from '@/sanity/lib/projectMapper';

type ProjectPageParams = {
  params: Promise<{ slug: string }>;
};

async function fetchSanityProject(slug: string) {
  try {
    return await client.fetch<SanityProjectDocument | null>(projectBySlugQuery, { slug });
  } catch (error) {
    console.warn(`Sanity project fetch failed for slug "${slug}". Falling back to local data.`, error);
    return null;
  }
}

async function getProjectForSlug(slug: string): Promise<MappedProject | null> {
  const hardcodedProject = PROJECTS.find((project) => project.slug === slug);
  const sanityProject = await fetchSanityProject(slug);
  const mappedProject = mapSanityProjectToProject(sanityProject, hardcodedProject);

  if (!mappedProject) return null;

  return mappedProject;
}

export async function generateStaticParams() {
  try {
    const sanitySlugs = await client.fetch<Array<{ slug?: string }>>(allProjectSlugsQuery);
    const validSanitySlugs = sanitySlugs
      .map((project) => project.slug)
      .filter((slug): slug is string => Boolean(slug));

    if (validSanitySlugs.length > 0) {
      return validSanitySlugs.map((slug) => ({ slug }));
    }
  } catch (error) {
    console.warn('Sanity project slug fetch failed. Falling back to local project slugs.', error);
  }

  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectForSlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | VAASTU Architecture',
    };
  }

  return {
    title: project.sanity?.seo?.title ?? `${project.title} | VAASTU Architecture`,
    description: project.sanity?.seo?.description ?? project.description,
    openGraph: {
      title: project.sanity?.seo?.title ?? project.title,
      description: project.sanity?.seo?.description ?? project.description,
      images: project.sanity?.seo?.image ? [{ url: project.sanity.seo.image }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { slug } = await params;
  const project = await getProjectForSlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
