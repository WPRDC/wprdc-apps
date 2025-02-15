export default async function TermsPage() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col gap-3 py-12 text-lg">
      <h2 className="mb-8 text-5xl font-bold">Terms of Use</h2>

      <p>
        This tool was developed to provide people with information about
        communities and properties that can be used to expand and preserve
        affordable housing in Allegheny County. This document describes the
        terms of use that are designed to minimize the ability for actors in the
        housing market to use this data to act in a malicious or predatory
        fashion, and work counter to the mission of the Preservation Working
        Group
      </p>

      <p>
        People affiliated with the following types of organizations will receive
        access to the data tool upon request, unless a conflict of interest
        exists between a person’s other affiliations and the intent of the
        Preservation Working Group.
      </p>

      <ul className="mb-4 list-inside list-disc">
        <li>
          Housing and community development-focused nonprofit organizations
        </li>
        <li>Local, state, and federal government agencies and authorities</li>
        <li>Philanthropic organizations/Charitable</li>
      </ul>

      <p>
        People at the following types of organizations may request access to the
        tool from the Preservation Working Group. The Group may choose to grant
        access without extra conditions, place additional limitations on users
        from these organizations, or deny the request for access.
      </p>

      <ul className="mb-4 list-inside list-disc">
        <li>Media organizations</li>
        <li>Students</li>
        <li>Researchers</li>
        <li>Mission-aligned developers</li>
        <li>Financial institutions</li>
      </ul>

      <h4 className="mb-2 text-3xl font-bold">Permitted Uses</h4>

      <h5 className="text-xl font-bold">
        You are free and encouraged to use the data to:
      </h5>

      <ul className="mb-4 list-inside list-disc">
        <li>Expand and preserve affordable housing</li>
        <li>Improve community and resident well-being</li>
        <li>Enhance your understanding of community dynamics</li>
      </ul>

      <h5 className="text-xl font-bold">As long as you:</h5>

      <ul className="mb-4 list-inside list-disc">
        <li>
          Register for access in good faith, accurately representing your
          organizational status, eligibility, and intended use.
        </li>
        <li>
          Do not transfer your rights or credentials to use the tool to anyone
          else. Please encourage others to contact us for access.
        </li>
        <li>
          Do not share the tool’s bulk data, or large extracts of the data with
          others.
        </li>
        <li>
          Use special care when sharing reports or other extracts from the tool
          or database with non-registered users so as not to work counter to the
          mission of the Preservation Working Group. This may include redacting
          data related to subsidy expiration or inspection scores.
        </li>
        <li>
          Do not violate any of the security mechanisms established to prevent
          unauthorized users from accessing this tool.
        </li>
        <li>
          Remain employed or part of the organization that was listed in your
          initial application.
        </li>
        <li>
          Please let us know if you’ve moved to a new organization, even if
          you’ll be eligible to access the data in your new home or position.
        </li>
        <li>
          Provide attribution to the Preservation Working Group, Western
          Pennsylvania Regional Data Center, Carnegie Mellon Create Lab, and
          Preservation Working Group when using data and other information from
          the tool in reports, visualizations, stories, research, etc. We
          suggest you use the following language:
        </li>
        <li>
          This tool was created by the Western Pennsylvania Regional Data Center
          at the University of Pittsburgh and the Carnegie Mellon CREATE Lab in
          partnership with the Preservation Working Group. Data used in the tool
          comes from a variety of sources, including HUD and the Pennsylvania
          Housing Finance Agency.
        </li>
        <li>
          Consult Neighborhood Allies if you are in doubt about a prospective
          usage of the tool’s data.
        </li>
      </ul>

      <h4 className="mb-2 text-3xl font-bold">Termination</h4>
      <p>
        Users that fail to comply with the terms of use will have their rights
        to use the tool and access the data terminated.
      </p>
      <h4 className="mb-2 text-3xl font-bold">Disclaimer</h4>
      <p>
        The University of Pittsburgh, the City of Pittsburgh, Allegheny County
        (partners in the Western Pennsylvania Regional Data Center (WPRDC)),
        Neighborhood Allies and other members of the Preservation Working Group,
        and the Carnegie Mellon CREATE Lab hereby disclaim all implied and
        express warranties of any kind with regard to data made available
        through this tool or the WPRDC, and accessed by the user through the
        tool or WPRDC, including, but not limited to, the warranties of
        merchantability and of fitness for any particular purpose specific
        purpose. The University of Pittsburgh does not warrant the completeness
        or accuracy of the data made available through the WPRDC. User hereby
        acknowledges and accepts the above disclaimers and uses all of the data
        in the tool and WPRDC at its own risk and on an “as is” and “as
        available” basis.
      </p>
      <h4 className="mb-2 text-3xl font-bold">Indemnification</h4>
      <p>
        User agrees to indemnify, release, and hold harmless the University of
        Pittsburgh, the City of Pittsburgh, Allegheny County - partners in the
        Western Pennsylvania Regional Data Center (WPRDC), members of the
        Preservation Working Group, and the Carnegie Mellon CREATE Lab to
        include its elected officials, officers, appointees, employees and
        agents, from any and all liability for claims arising out of my access
        to and/or use of data made available through the tool or the WPRDC.
      </p>
    </div>
  );
}
