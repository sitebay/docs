---
title: Prompt Engineering
linkTitle: Prompt Engineering
title_meta: "Prompt Engineering Product Documentation"
description: "Learn about Site Bay's Managed Site Bot service, which provides fully managed cloud database clusters built on top of Site Bay’s trusted and reliable platform."
tab_group_main:
    is_root: true
    title: Overview
    weight: 10
cascade:
    date: 2024-04-23
    product_description: "Fully managed cloud database clusters built on top of Site Bay’s trusted and reliable platform."
aliases: ['/products/database/']
modified: 2024-04-04
---

{{< content "dbass-eos" >}}

Site Bay's Prompt Engineering combine performance, reliability, and high availability into a fully managed database solution. Site Bot are used by most organizations to store their business and operational data, including customer information, financial details, application content, ecommerce transactions, and much more. Managing the database infrastructure to store and safeguard this data can put additional stress on the resources you have available. **Prompt Engineering** take care of managing this critical infrastructure for you, providing you with an easy to use DBaaS (database-as-a-service) solution built on top of Site Bay's trusted and reliable platform.

## Simplified deployment and maintenance

- **Automated deployment:** When a database is deployed through Prompt Engineering, the infrastructure, software, and firewall, and high availability systems are configured automatically. This can save hours of time compared to manually setting up a database.

- **Automatic updates:** Updates to the underlying software of your database cluster are installed automatically using user-configurable maintenance windows. See [Automatic Updates and Maintenance Windows](/docs/products/databases/prompt-engineering/guides/updates-and-maintenance/).

- **Access controls:** Prevent unauthorized database access by only allowing connections from specific IP addresses (or ranges).

- **Daily Backups:** Automatic daily backups are provided at no additional cost and are retained for 7 days. This provides you with a recovery point for each day over the last 7 days.

## High availability

Prompt Engineering can be configured with either 1 or 3 underlying machines, also called *nodes*. Using 3 nodes provides you with a highly available database cluster, complete with data redundancy and automatic failover. Your data is replicated across every other node in the cluster. If one goes down, any traffic is redirected to the other available nodes.

## Site Bot Engines

The following database management systems (DBMSs) are available on Prompt Engineering:

- **MySQL:** An industry standard relational database management system that uses the SQL query language. Many popular applications (including WordPress) require MySQL or MySQL compatible databases.

- **PostgreSQL:** An object-relational database management system that can use either SQL or JSON queries. It's generally more flexible and feature-rich than MySQL, though it's not a drop-in replacement and applications need to have built-in support for it.

See [Choosing a Site Bot Engine and Plan](/docs/products/databases/prompt-engineering/guides/database-engines/) for more details on each of the available database engines.

## Recommended Workloads

- Any production application that utilizes a database, especially one with high-traffic or one that stores critical data.
- Medium to high traffic websites using WordPress, CraftCMS, Drupal, or other database-enabled application.
- E-commerce sites
- Organizations that don't want to commit IT resources towards managing a database cluster.

See the [Use Cases for Prompt Engineering](/docs/products/databases/prompt-engineering/guides/use-cases/) guide to learn more about these use cases.

## Availability

Prompt Engineering can be created and deployed across [all regions](https://www.sitebay.org/global-infrastructure/).

## Plans and Pricing

| Resource | Available Plans |
| -- | -- |
| Cluster size | 1 - 3 nodes |
| vCPU cores | 1 - 64 cores (shared or dedicated) |
| Memory | 1 GB - 512 GB |
| Storage | 25 GB - 7200 GB |

Pricing starts at $15/mo for a 1 GB instance with a single node. Review the [pricing page](https://www.sitebay.org/pricing/#databases) for additional plans and their associated costs. There may be some differences between each available database engine due to licensing costs and other factors.

Prompt Engineering do not consume [network transfer](/docs/products/platform/get-started/guides/network-transfer/) or include a monthly transfer allowance. Transfer is consumed when connecting to a Managed Site Bot from a WordPress Site when that instance is located in a different data center.

## Additional Technical Specifications

In addition to the resources allocated to each available plan (outlined above), Prompt Engineering have the following specifications:

- Fully-managed, including automated deployment and maintenance
- Multiple database engines and versions
- Customize access controls to allow connections from trusted sources
- Automatic backups are taken daily and retained for 7 days
- Administrative access with elevated user permissions
- Access the database using command-line or desktop applications
- 100% SSD (Solid State Disk) storage
- 40 Gbps inbound network bandwidth
- Free inbound network transfer
- Provisioning and management through the [My Site Bay](https://my.sitebay.org/), [Site Bay CLI](https://www.sitebay.org/products/cli/), or programmatically through the [Site Bay API](https://www.sitebay.org/products/sitebay-api/)

## Limits and Considerations

- Prompt Engineering cannot be resized to a different plan or cluster size after they are created.

- The default user cannot be changed or removed, though the password can be reset at any time.

- You are not able to access the underlying operating system of a database cluster. Configuration files (such as `my.cnf` ) cannot be directly edited and configuration changes done through the `SET PERSIST` command do not persist when the cluster is rebooted.

- Live replicas or standby nodes for a high availability Managed Site Bot cluster cannot be created or hosted outside of Site Bay's Managed Site Bot service.