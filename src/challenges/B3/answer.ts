/**
 * In this challenge, you must find and attach to each group the group (or groups)
 * with which the current group has the most skills in common.
 * Attached groups must be sorted by their name (A to Z).
 * You must not change the order of the main list of groups.
 *
 * @param groups List of groups without closestGroups
 * @returns The same list but with a new closestGroups prop on each
 */

// ↓ uncomment bellow lines and add your response!
const commonSkills = (comparedGroup:GroupWithSills, group:GroupWithSills) => {
   return comparedGroup.skills.filter((comparedSkill) => group.skills.includes(comparedSkill)).length
}


export default function ({
  groups,
}: {
  groups: GroupWithSills[];
}): GroupWithSillsAndClosestGroups[] {
  const result = groups.map((group) => {
        const closestGroups = groups.reduce<GroupWithSills[]>((acc, comparedGroup) => {
            if (group.name !== comparedGroup.name) {
              if (commonSkills(comparedGroup, group) === commonSkills(acc[0], group)) {
                return [...acc,comparedGroup];
              } else if (commonSkills(comparedGroup, group) > commonSkills(acc[0], group)) {
                return [comparedGroup];
              }
            }
            return acc;
          },
          [
            {
              name: '',
              skills: [],
            },
          ]
        );
        return {...group, closestGroups}
  });
  return result;
}
//   const groupWithClosestGroups = groups.map((group) => {
//     const closestGroupsWithCommonSkills = groups.reduce(
//       (acc, comparedGroup) => {
//         if (group.name !== comparedGroup.name) {
//           const commonSkills = comparedGroup.skills.filter((comparedSkill) =>
//             group.skills.includes(comparedSkill)
//           );
//           if (commonSkills.length >= acc[0].skills.length) {
//             return [...acc, comparedGroup];
//           }
//         }
//         return acc;
//       },
//       [
//         {
//           name: '',
//           skills: [],
//         },
//       ]
//     );
//     return closestGroupsWithCommonSkills;
//   });
// }

// const groupsWithClosestGroups = groups.map((group) => {
//   const closestGroupWithCommonSkills = groups.reduce(
//     (acc, comparedGroup) => {
//       if (group.name !== comparedGroup.name) {
//         const commonSkills = comparedGroup.skills.filter((comparedSkill) =>
//           group.skills.includes(comparedSkill)
//         );
//         if (commonSkills.length > acc.skills.length) {
//           return { ...comparedGroup, skills: commonSkills };
//         }
//       }
//       console.log({acc});
//       return acc;
//     },
//     {
//       name: '',
//       skills: [],
//     }
//   );
//   const closestGroupWithAllSkills = groups.find(
//     (group) => group.name === closestGroupWithCommonSkills.name
//   ) || {
//       name: '',
//       skills: [],
//     };
//   return { ...group, closestGroups: closestGroupWithAllSkills };
// });
// return groupsWithClosestGroups;

// used interfaces, do not touch
export interface GroupWithSills {
  name: string;
  skills: string[];
}

export interface GroupWithSillsAndClosestGroups extends GroupWithSills {
  closestGroups: GroupWithSills[];
}
